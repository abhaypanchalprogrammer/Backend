import express, { Router } from "express";
import cookieParser from "cookie-parser";
import { router } from "./routes/auth.routes.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
export default app;
