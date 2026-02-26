import postModel from "../models/post.model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "please upload an image to create post",
      });
    }
    const file = await client.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
      folder: "/posts",
    });
    const newPost = await postModel.create({
      caption,
      imgUrl: file.url,
      user: req.user.id,
    });
    res.status(201).json({
      message: "Post Created Successfully",
      newPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "Post Creation Failed",
    });
  }
};

export const getPostController = async (req, res) => {
  try {
    const userId = req.user.id;

    const post = await postModel.find({
      user: userId,
    });
    res.status(200).json({
      message: "post fetched successfully",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Post fetching failed",
    });
  }
};

export const getPostDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const isValidUser = post.user.equals(userId);
    if (!isValidUser) {
      return res.status(403).json({
        message: "Forbidden content",
      });
    }
    return res.status(200).json({
      message: "post fetched successfully",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
