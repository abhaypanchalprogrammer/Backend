import { Router } from "express";
import {
  getme,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
export const authRouter = Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/getme", authUser, getme);
authRouter.get("/logout", logoutUser);
