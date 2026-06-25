const prisma = require("../prismaClient");

// GET all applications
const getApplications = async (req, res) => {

  try {
    const applications =
      await prisma.application.findMany({
        where: {
          userId: req.user.id,
        },
      });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch applications",
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      status,
      match,
    } = req.body;

    if (!company || !role || !location) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const newApplication =
      await prisma.application.create({
        data: {
          company,
          role,
          location,
          status,
          match,
          userId: req.user.id,
        },
      });

    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create application",
    });
  }
};

const deleteApplication = async (
  req,
  res
) => {
  try {
    const id = Number(req.params.id);

    const application =
  await prisma.application.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

if (!application) {
  return res.status(404).json({
    error: "Application not found",
  });
}
await prisma.application.delete({
  where: {
    id,
  },
});
    res.json({
      message:
        "Application deleted",
    });
  } catch (error) {
    res.status(500).json({
      error:
        "Failed to delete application",
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingApplication =
      await prisma.application.findFirst({
        where: {
          id,
          userId: req.user.id,
        },
      });

    if (!existingApplication) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    const {
      company,
      role,
      location,
      status,
      match,
    } = req.body;

    const updatedApplication =
      await prisma.application.update({
        where: {
          id,
        },
        data: {
          company,
          role,
          location,
          status,
          match,
        },
      });

    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update application",
    });
  }
};

module.exports = {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication,
};