import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { getSong, uploadSong } from "../controller/song.controller.js";

export const songRouter = express.Router();

songRouter.post("/song", upload.single("song"), uploadSong);
songRouter.get("/getSong", getSong);
