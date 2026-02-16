const mongoose = require("mongoose");

//Schema = database ko batana ki kis format me data store krna hai
const noteScheme = new mongoose.Schema({
  title: String,
  description: String,
});

const noteModel = mongoose.model("notes", noteScheme);

module.exports = noteModel;
