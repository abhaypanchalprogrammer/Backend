import express from "express";
import cookieParser from "cookie-parser";
import authrouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authrouter);
app.use("/api/posts", postRouter);
export default app;
