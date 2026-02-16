/* 
    SERVER KO START KRNA AND DATABASE KO MANAGE KRNA 
*/

// const app = require("./src/app");
// const mongoose = require("mongoose");

// const connectToDb = () => {
//   mongoose
//     .connect(
//       "mongodb+srv://abhaypanchal2525_db_user:a1b2h3a4y5@cluster1.iyzf98x.mongodb.net/day-5",
//     )
//     .then(() => {
//       console.log("Connected to Database");
//     });
// };
// connectToDb();

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });
const app = require("./src/app");

const connectToDb = require("./src/config/database");

connectToDb();

app.listen(3001, () => {
  console.log("server is runnning on port 3001");
});
