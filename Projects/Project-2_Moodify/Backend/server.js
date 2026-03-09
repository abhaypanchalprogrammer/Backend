import "dotenv/config";
import app from "./src/app.js";
import { connectToDb } from "./src/config/database.js";

connectToDb();
app.listen(3001, () => {
  console.log("Server is running in port number 3001");
});
