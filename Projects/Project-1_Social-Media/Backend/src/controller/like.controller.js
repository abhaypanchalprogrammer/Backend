import { likeModel } from "../models/like.model.js";

export const likeController = async (req, res) => {
  try {
    const user = req.user.id;
    const post = req.params.id;

    const isAlreadyLiked = await likeModel.findOne({ user, post });
    if (isAlreadyLiked) {
      await likeModel.findOneAndDelete({ user, post });
      return res.status(200).json({
        message: "like removed",
      });
    }
    const createLike = await likeModel.create({
      user,
      post,
    });
    res.status(201).json({
      message: "Like Created",
      createLike,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
