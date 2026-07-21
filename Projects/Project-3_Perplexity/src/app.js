import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//health check
app.get("/", (req, res) => {
  res.json({ message: "🚀 Server is running!", status: "OK" });
});

app.use("/api/auth", authRouter);
export { app };
