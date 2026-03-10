import { songModel } from "../models/song.model.js";
import id3 from "node-id3";
import { uploadFile } from "../services/storage.service.js";
export const uploadSong = async (req, res) => {
  const songBuffer = req.file.buffer;
  const tags = id3.read(songBuffer);
  const { mood } = req.body;
  const [songFile, posterFile] = await Promise.all([
    uploadFile({
      buffer: songBuffer,
      fileName: tags.title + ".mp3",
      folder: "/cohort2/moodify/songs",
    }),

    uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title + ".jpeg",
      folder: "/cohort2/moodify/poster",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "song create successfully",
    song,
  });
};

export const getSong = async (req, res) => {
  const { mood } = req.query;
  const song = await songModel.findOne({ mood });
  res.status(200).json({
    message: "song fetched successfully",
    song,
  });
};
