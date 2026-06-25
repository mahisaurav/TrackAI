const prisma = require("../prismaClient");


const { generateInterviewQuestions, } = require("../services/geminiService");
const { GetObjectCommand, } = require("@aws-sdk/client-s3");

const s3 = require("../config/s3");

const pdfParse = require("pdf-parse");

const generateInterview =
    async (req, res) => {
        try {

            const { resumeId } =
                req.body;

            if (!resumeId) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Resume ID required",
                });
            }

            const resume =
                await prisma.resume.findFirst({
                    where: {
                        id: Number(resumeId),
                        userId: req.user.id,
                    },
                });

            if (!resume) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Resume not found",
                });
            }

            const command =
                new GetObjectCommand({
                    Bucket:
                        process.env.AWS_BUCKET_NAME,

                    Key:
                        resume.s3Key,

                });

            const response =
                await s3.send(command);

            const pdfBuffer =
                Buffer.from(
                    await response.Body.transformToByteArray()
                );

            const pdfData =
                await pdfParse(pdfBuffer);

            const resumeText =
                pdfData.text;

            console.log("Resume text length:",resumeText.length);


            const questions =
                await generateInterviewQuestions(
                    resumeText
                );

            res.status(200).json({
                success: true,
                questions,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message:
                    "Failed to generate interview",
            });
        }
    };

module.exports = {
    generateInterview,
};