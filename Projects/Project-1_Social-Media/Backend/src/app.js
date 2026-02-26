import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

//imported routes
import authrouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";
import likeRouter from "./routes/like.route.js";

//APIs
app.use("/api/auth", authrouter);
app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
app.use("/api/post", likeRouter);
export default app;
