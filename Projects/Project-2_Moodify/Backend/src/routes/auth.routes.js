import { Router } from "express";
import {
  getme,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
export const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getme", authUser, getme);
router.get("/logout", logoutUser);
