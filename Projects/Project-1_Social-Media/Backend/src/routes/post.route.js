import express from "express";
import {
  createPostController,
  getPostController,
  getPostDetails,
} from "../controller/post.controller.js";
const postRouter = express.Router();
import multer from "multer";

import { identifyUser } from "../middlewares/auth.middleware.js";
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  createPostController,
);
postRouter.get("/", identifyUser, getPostController);
postRouter.get("/details/:postId", identifyUser, getPostDetails);
export default postRouter;
