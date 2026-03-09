import "dotenv/config";
import app from "./src/app.js";
import { connectToDb } from "./src/config/database.js";
import cors from "cors";
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
connectToDb();
app.listen(3001, () => {
  console.log("Server is running in port number 3001");
});
