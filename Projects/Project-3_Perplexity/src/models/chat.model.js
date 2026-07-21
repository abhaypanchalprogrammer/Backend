import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    default: "New Chat",
    trim: true,
  },
});

export const chatModel = mongoose.model("chat", chatSchema);
