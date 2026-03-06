import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token required"],
    },
  },
  {
    timestamps: true,
  },
);

export const blacklistModel = mongoose.model("blaclist", blacklistSchema);
