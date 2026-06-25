const express = require("express");

const upload = require("../middleware/uploadMiddleware");
const prisma = require("../prismaClient");

const router = express.Router();
const {
  PutObjectCommand,GetObjectCommand,DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = require("../config/s3");
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  getSignedUrl,
} = require("@aws-sdk/s3-request-presigner");


const pdfParse = require("pdf-parse");

const { analyzeResumeATS } = require("../services/geminiService");
const { calculateAtsScore } = require("../utils/atsScoreCalculator");

router.post(
  "/upload",authMiddleware,
  upload.single("resume"),
  async (req, res) => {

    try {

      const fileKey =
        `resumes/${Date.now()}-${req.file.originalname}`;

      const command =
        new PutObjectCommand({
          Bucket:
            process.env.AWS_BUCKET_NAME,

          Key: fileKey,

          Body: req.file.buffer,

          ContentType:
            req.file.mimetype,
        });

      await s3.send(command);

      await prisma.resume.create({
         data: {
        title: req.file.originalname,
        filename: req.file.originalname,
        s3Key: fileKey,
        userId: req.user.id,
    },
    });

      res.status(200).json({
        success: true,
        fileKey,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: "Upload failed",
      });

    }

  }
);
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const resumes = await prisma.resume.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          uploadedAt: "desc",
        },
      });

      res.status(200).json(resumes);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to fetch resumes",
      });
    }
  }
);

router.get(
  "/:id/preview",
  authMiddleware,
  async (req, res) => {
    try {

      const resume =
        await prisma.resume.findFirst({
          where: {
            id: Number(req.params.id),
            userId: req.user.id,
          },
        });

      if (!resume) {
        return res.status(404).json({
          error: "Resume not found",
        });
      }

      const command =
        new GetObjectCommand({
          Bucket:
            process.env.AWS_BUCKET_NAME,

          Key: resume.s3Key,
        });

      const url =
        await getSignedUrl(
          s3,
          command,
          { expiresIn: 300 }
        );

      res.status(200).json({
        url,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: "Failed to preview resume",
      });

    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const resume =
        await prisma.resume.findFirst({
          where: {
            id: Number(req.params.id),
            userId: req.user.id,
          },
        });

      if (!resume) {
        return res.status(404).json({
          error: "Resume not found",
        });
      }

      const command =
        new DeleteObjectCommand({
          Bucket:
            process.env.AWS_BUCKET_NAME,

          Key: resume.s3Key,
        });

      await s3.send(command);

      await prisma.resume.delete({
        where: {
          id: resume.id,
        },
      });

      res.status(200).json({
        message:
          "Resume deleted successfully",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error:
          "Failed to delete resume",
      });

    }
  }
);

router.post(
  "/:id/analyze",
  authMiddleware,
  async (req, res) => {
    try {
      const { jobDescription } = req.body;

      if (!jobDescription?.trim()) {
        return res.status(400).json({
          error: "Job description is required",
        });
      }

      const resume = await prisma.resume.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });

      if (!resume) {
        return res.status(404).json({
          error: "Resume not found",
        });
      }

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: resume.s3Key,
      });

      const response = await s3.send(command);

      const pdfBuffer = Buffer.from(
        await response.Body.transformToByteArray()
      );

      const pdfData = await pdfParse(pdfBuffer);

      const geminiAnalysis = await analyzeResumeATS(
        pdfData.text,
        jobDescription.trim()
      );

      const { atsScore } = calculateAtsScore(geminiAnalysis);

      const report = {
        atsScore,
        matchedSkills: geminiAnalysis.matchedSkills ?? [],
        missingSkills: geminiAnalysis.missingSkills ?? [],
        additionalSkills: geminiAnalysis.additionalSkills ?? [],
        strengths: geminiAnalysis.strengths ?? [],
        improvements: geminiAnalysis.improvements ?? [],
        summary: geminiAnalysis.summary ?? "",
      };

      await prisma.resume.update({
        where: {
          id: resume.id,
        },
        data: {
          atsScore,
          analyzed: true,
          atsReport: report,
        },
      });

      res.json(report);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Analysis failed",
      });
    }
  }
);
module.exports = router;