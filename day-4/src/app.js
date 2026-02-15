/* 
app.js ka kaam
server ko create krna 
server ko config krna 
*/

const express = require("express");
const app = express();
app.use(express.json());
const student = [];

app.post("/student", (req, res) => {
  console.log(req.body);
  student.push(req.body);
  res.status(201).json({
    message: "Data Added in student API",
  });
});
app.delete("/student/:index", (req, res) => {
  delete student[req.params.index];
  res.status(200).json({
    message: "Data Deleted From Student API",
  });
});
app.patch("/student/:index", (req, res) => {
  student[req.params.index].college = req.body.college;
  res.status(200).json({
    message: "Data is Edited into Student API",
  });
});
app.get("/", (req, res) => {
  res.send("this is the first page of this server");
});

module.exports = app;
