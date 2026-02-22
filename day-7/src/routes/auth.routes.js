import express from "express";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { error } from "console";

const authRouter = express.Router();
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({
      message: "User is already exists with this email address",
    });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user registered successfully",
    user,
    token,
  });
});

authRouter.post("/protected", async (req, res) => {
  console.log(req.cookies);
  res.status(201).json({
    message: "this route is protected",
  });
});
// controller
// authRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await userModel.findOne({ email });
//   if (!user) {
//     return res.status(404).json({
//       message: "user does not exist with this email address",
//     });
//   }

//   const isPasswordCorrect =
//     user.password === crypto.createHash("md5").update(password).digest("hex");
//   if (!isPasswordCorrect) {
//     return res.status(401).json({
//       message: "password is incorrect",
//     });
//   }
//   const token = jwt.sign(
//     {
//       id: user._id,
//     },
//     process.env.JWT_SECRET,
//   );
//   res.cookie("jwt_token", token);
//   res.status(200).json({
//     message: "login successtful",
//   });
// });

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = userModel.findOne({ email });
  if (!user) {
    return res.status(409).json({
      message: "user with this email already exists",
    });
  }
  const hashPassword = crypto.createHash("md5").update(password).digest("hex");
  const isCorrectPassword = user.password === hashPassword;
  if (!isCorrectPassword) {
    return res.status(404).json({
      message: "incorrect password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);
  res.status(200).json({
    message: "Login successful",
    user,
    token,
  });
});
export default authRouter;
