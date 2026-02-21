import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();
import connecteToDb from "./src/config/database.js";
connecteToDb();

app.listen(process.env.PORT, () => {
  console.log("server is running on port 5000");
});
