import "./src/config/env.js";
import app from "./src/app.js";
import connectToDatabase from "./src/config/database.js";

connectToDatabase();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("this server is running on port 3001");
});
