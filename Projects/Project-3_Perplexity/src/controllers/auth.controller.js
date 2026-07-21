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

  sendEmail({
    to: email,
    subject: "Welcome to our app",
    html: `<p>hi ${username},</p><p>\n\nThank You for Registering in Our ChatBot, we're excited to hjave you on board!</p><p>\n\nBest Regards, \nThe ChatBot Team</p>`,
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
