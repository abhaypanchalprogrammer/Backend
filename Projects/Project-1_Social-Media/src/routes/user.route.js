import express from "express";
import {
  followUserController,
  getFollowerDetail,
  getFollowingDetail,
} from "../controller/user.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { editBioController } from "../controller/edit.controller.js";

const userRouter = express.Router();

userRouter.get("/following/:username", identifyUser, getFollowingDetail);
userRouter.get("/followers/:username", identifyUser, getFollowerDetail);
userRouter.post("/follow/:username", identifyUser, followUserController);
userRouter.put("/update/:username", identifyUser, editBioController);

export default userRouter;
