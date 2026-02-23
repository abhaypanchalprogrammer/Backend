import postModel from "../models/post.model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "no file is uploaded" });
    }
    const file = await client.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
      folder: "/posts",
    });
    const newPost = await postModel.create({
      caption,
      imgUrl: file.url,
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Post creation failed",
    });
  }
};
