import { Router } from "express";
import {
  getme,
  login,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  handleValidationErrors,
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.get("/getme", authUser, getme);
authRouter.get("/verify-email", verifyEmail);
