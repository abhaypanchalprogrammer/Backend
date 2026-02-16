// server ko start karna and database ko connect karna
require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");

connectToDb();
app.listen(5001, () => {
  console.log("this server is running on port 5001");
});
