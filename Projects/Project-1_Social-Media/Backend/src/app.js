import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

/* ✅ DEFINE CORS OPTIONS ONCE */
const corsOptions = {
  origin: "https://app-social-media-app.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

/* ✅ MIDDLEWARE ORDER MATTERS */
app.use(cors(corsOptions));
app.options("*name", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// imported routes
import authrouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";
import likeRouter from "./routes/like.route.js";

// APIs
app.use("/api/auth", authrouter);
app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
app.use("/api/post", likeRouter);

export default app;
