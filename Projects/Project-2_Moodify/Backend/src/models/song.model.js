import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: {
      values: ["happy", "sad", "surprised"],
      message: "enum this is",
    },
  },
});

export const songModel = mongoose.model("song", songSchema);
