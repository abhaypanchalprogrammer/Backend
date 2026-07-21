import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import {
  handleValidationErrors,
  registerValidator,
} from "../validators/auth.validator.js";

export const authRouter = Router();

authRouter.post("/register", registerValidator, register);
