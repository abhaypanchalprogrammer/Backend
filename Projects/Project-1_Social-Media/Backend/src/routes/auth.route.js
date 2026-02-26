import express from "express";
import {
  getMeController,
  loginUser,
  registerUser,
} from "../controller/auth.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/getme", identifyUser, getMeController);
export default authRouter;
