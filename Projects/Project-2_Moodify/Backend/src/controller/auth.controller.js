import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { blacklistModel } from "../models/blacklist.model.js";
import redis from "../config/cache.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isAlreadyExists) {
      return res.status(409).json({
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    res.status(201).json({
      message: "Register successful",
    });
  } catch (err) {
    res.status(500).json({
      message: "Registration Failed",
      error: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!password || (!email && !username)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isUserExists = await userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .select("+password");

    if (!isUserExists) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const hashPass = await bcrypt.compare(password, isUserExists.password);

    if (!hashPass) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: isUserExists._id,
        username: isUserExists.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const getme = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "user fetched successfullu",
    user,
  });
};

export const logoutUser = async (req, res) => {
  const token = req.cookies.token;
  res.clearCookie("token");
  await redis.set(token, Date.now().toString());

  res.status(201).json({
    message: "logout successful",
  });
};
