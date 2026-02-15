const express = require("express");
const app = express();
app.use(express.json()); // is libe ke bina server user ki req ko nahi padh sakta
const notes = [];

app.post("/notes", (req, res) => {
  console.log(req.body); // is line se user ki req ko server tak pahucha sakte hai
  notes.push(req.body);
  res.send("note created");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});
app.listen(3001, () => {
  console.log("server is running on port 3001");
});
