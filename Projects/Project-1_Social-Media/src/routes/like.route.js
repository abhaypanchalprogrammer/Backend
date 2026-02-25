import express from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { likeController } from "../controller/like.controller.js";
const likeRouter = express.Router();

likeRouter.post("/:id/like", identifyUser, likeController);
export default likeRouter;
