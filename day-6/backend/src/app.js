const express = require("express");
const app = express();
const noteModel = require("./models/notes.model");
app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await newModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Data added successfully",
    notes,
  });
});

app.get("/notes", async (req, res) => {
  const note = await noteModel.find();

  res.status(200).json({
    message: "Data Retieved successfully",
    note,
  });
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "note deleted successfully",
  });
});

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  await noteModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "note updated successfully",
  });
});

module.exports = app;
