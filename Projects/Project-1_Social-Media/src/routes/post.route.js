import express from "express";
import {
  createPostController,
  getPostController,
  getPostDetails,
} from "../controller/post.controller.js";
const postRouter = express.Router();
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), createPostController);
postRouter.get("/", getPostController);
postRouter.get("/details/:postId", getPostDetails);
export default postRouter;
