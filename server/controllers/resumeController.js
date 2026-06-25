const prisma = require("../prismaClient");

const uploadResume = async (req, res) => {

  try {

    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    console.log(req.file);

    const resume = await prisma.resume.create({
      data: {
        title,
        filename: req.file.originalname,
        fileUrl: req.file.path,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  uploadResume,
};