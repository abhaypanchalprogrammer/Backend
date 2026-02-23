import postModel from "../models/post.model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const createPostController = async (req, res) => {
  // try {
  //   const { caption } = req.body;
  //   const token = req.cookies.token;
  //   if (!token) {
  //     return res.status(401).json({
  //       message: "You are not logged in",
  //     });
  //   }
  //   let decoded;
  //   try {
  //     decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   } catch {
  //     return res.status(401).json({ message: "Invalid or exprired token" });
  //   }
  //   if (!req.file) {
  //     return res.status(400).json({ message: "no file is uploaded" });
  //   }
  //   const file = await client.files.upload({
  //     file: await toFile(req.file.buffer, req.file.originalname),
  //     fileName: req.file.originalname,
  //     folder: "/posts",
  //   });
  //   const newPost = await postModel.create({
  //     caption,
  //     imgUrl: file.url,
  //     user: decoded.id,
  //   });
  //   res.status(201).json({
  //     message: "Post Created successfully",
  //     newPost,
  //   });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({
  //     message: "Post creation failed",
  //   });
  // }

  try {
    const { caption } = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "please login to create a post",
      });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or Expired token",
      });
    }
    console.log(decoded);
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
      user: decoded.id,
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
