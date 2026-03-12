import cors from "cors";
import express, { Router } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { authRouter } from "./routes/auth.routes.js";
import { songRouter } from "./routes/song.routes.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.static("./public"));
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api", songRouter);
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});
export default app;
