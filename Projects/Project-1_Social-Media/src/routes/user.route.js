import express from "express";
import { followUserController } from "../controller/user.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";
const userRouter = express.Router();

userRouter.post("/follow/:username", identifyUser, followUserController);
export default userRouter;
