import express from "express";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
const { jsonwebtoken } = jwt;

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({
      message: "this user is already exists",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  res.status(201).json({
    message: "user registered successfully",
    user,
    token,
  });
});

export default authRouter;
