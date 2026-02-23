import express from "express";
import { createPostController } from "../controller/post.controller.js";
const postRouter = express.Router();
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), createPostController);

export default postRouter;
