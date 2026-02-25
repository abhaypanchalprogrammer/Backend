import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: [true, "Post not uploaded"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "username is required"],
    },
  },
  {
    timestamps: true,
  },
);
likeSchema.index(
  { post: 1, user: 1 },
  {
    unique: true,
  },
);
export const likeModel = mongoose.model("like", likeSchema);
