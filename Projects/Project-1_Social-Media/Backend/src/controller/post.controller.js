import postModel from "../models/post.model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";
import { likeModel } from "../models/like.model.js";

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
    const populatedPost = await newPost.populate(
      "user",
      "username profileImage",
    );
    res.status(201).json({
      message: "Post Created Successfully",
      newPost: populatedPost,
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

export const getFeedController = async (req, res) => {
  const user = req.user;
  const posts = await Promise.all(
    (
      await postModel.find().sort({ createdAt: -1 }).populate("user").lean()
    ).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user.id,
        post: post._id,
      });

      post.isLiked = !!isLiked;
      return post;
    }),
  );

  res.status(200).json({
    message: "post fetched successfully",
    posts,
  });
};
