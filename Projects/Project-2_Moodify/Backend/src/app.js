import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { authRouter } from "./routes/auth.routes.js";
import { songRouter } from "./routes/song.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", songRouter);
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
