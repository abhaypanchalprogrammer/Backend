// hands-on practice code

const express = require("express");
const app = express();
const student = [];
app.use(express.json());
app.post("/student", (req, res) => {
  console.log(req.body);
  res.send("student is added");
  student.push(req.body);
});
app.delete("/student/:index", (req, res) => {
  delete student[req.params.index];
  res.send("student deleted");
});
app.patch("/student/:index", (req, res) => {
  student[req.params.index].college = req.body.college;
  res.send("field updated");
});
app.get("/student", (req, res) => {
  res.send(student);
});

app.get("/", (req, res) => {
  res.send("this is home page of this api");
});

module.exports = app;
