/* 
app.js ka kaam
server ko create krna 
server ko config krna 
*/

const express = require("express");
const app = express();
const student = [];
app.use(express.json());

//Create a data
app.post("/student", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    message: "note created successfully",
  });
  student.push(req.body);
});

//Delete Data
app.delete("/student/:index", (req, res) => {
  delete student[req.params.index];
  res.status(200).json({
    message: "note deleted",
  });
});

//Update Data
app.patch("/student/:index", (req, res) => {
  student[req.params.index].college = req.body.college;
  res.status(200).json({
    message: "note updated",
  });
});

//Retireve Data
app.get("/student", (req, res) => {
  res.send(student);
});

app.get("/", (req, res) => {
  res.send("this is home page");
});

module.exports = app;
