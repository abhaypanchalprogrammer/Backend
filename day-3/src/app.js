const express = require("express");
const app = express();
app.use(express.json());
const notes = [];
app.post("/notes", (req, res) => {
  console.log(req.body); // iski help se notes create hoti hai
  notes.push(req.body);
  res.send("note created");
  console.log(notes);
});
app.get("/notes", (req, res) => {
  res.send(notes); // note ko retrieve kr sakte hai
});
app.get("/", (req, res) => {
  res.send("hello world");
});
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index]; // notes ko delete kr sakte hai
  res.send("note is deleted");
});
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].college = req.body.college; // notes ko update krne ke liye
  res.send("note updated");
});
module.exports = app;
