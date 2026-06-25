const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../prismaClient");
const { getAuthCookieOptions } = require("../utils/cookieOptions");

const registerUser = async (req, res) => {

  try {

    const {name,email,password} = req.body;

    // Check existing user
    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create user
    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

    res.status(201).json({
  message: "User registered successfully",

  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Registration failed",
    });

  }
};

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, getAuthCookieOptions());

res.json({
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Login failed",
    });

  }
};

// controllers/authController.js

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", getAuthCookieOptions());

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getCurrentUser = async (req, res) => {
    try {

      const user =
        await prisma.user.findUnique({
          where: {
            id: req.user.id,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

      res.json({
        user,
      });

    } catch (error) {

      res.status(500).json({
        error:
          "Failed to fetch user",
      });
    }
};
module.exports = {
  registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
};