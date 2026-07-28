import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
      success: false,
      err: "user already exists",
    });
  }
  const user = await userModel.create({
    username,
    email,
    password,
  });

  const emailVerificationToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "Welcome to our app",
    html: `<p>hi ${username},</p><p>\n\nThank You for Registering in Our ChatBot, we're excited to hjave you on board!</p>
    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Click here to verify your email</a>
    <p>\n\nBest Regards, \nThe ChatBot Team</p>`,
  });

  res.status(201).json({
    message: "User registered Successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
      err: "user not found",
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
      success: false,
      err: "invalid password",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Email not verified",
      success: false,
      err: "email not verified",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const getme = async (req, res) => {
  const userId = req.user.id;
  const user = await userModel.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      err: "user not found",
    });
  }

  res.status(200).json({
    message: "User found",
    success: true,
    user,
  });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "invalid token",
      });
    }
    user.verified = true;
    await user.save();
    const html = `<p>hi ${user.username},</p><p>\n\nThank You for Verifying your email in Our ChatBot, we're excited to have you on board!</p>
  <a href="http://localhost:3000/login">Click here to login</a>`;

    res.send(html);

    res.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
      success: false,
      err: "invalid token",
    });
  }
};
