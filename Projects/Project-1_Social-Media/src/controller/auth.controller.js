import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * get user's data using req.body
 * check id username or email address already exists or not , if yes than return "error message"
 * that convert password in hash using crypto
 * than create data
 * than create token
 * than success response
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, bio, profileImage } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Please give you password",
      });
    }
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyExists) {
      return res.status(409).json({
        message:
          isUserAlreadyExists.email === email
            ? "User with this email is already exists"
            : "Username is not available",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hash,
      bio,
      profileImage,
    });
    const token = jwt.sign(
      {
        //user ka data hona chahiye and wo unique hona chahiye
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "User Registerd Successfully",
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!password) {
      return res.status(400).json({
        message: "Please give you password",
      });
    }
    const user = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isvalidPassword = await bcrypt.compare(password, user.password);
    if (!isvalidPassword) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "login successful",
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
