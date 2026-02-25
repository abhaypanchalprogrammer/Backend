import express from "express";
import {
  followUserController,
  getFollowerDetail,
  getFollowingDetail,
} from "../controller/user.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { editBioController } from "../controller/edit.controller.js";
import { unfollowController } from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/follow/:username", identifyUser, followUserController);
userRouter.put("/update", identifyUser, editBioController);
userRouter.delete("/unfollow/:username", identifyUser, unfollowController);
userRouter.get("/following/:username", identifyUser, getFollowingDetail);
userRouter.get("/followers/:username", identifyUser, getFollowerDetail);
export default userRouter;
