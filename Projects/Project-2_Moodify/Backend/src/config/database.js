import mongoose from "mongoose";

export const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Failed to connect with database", err);
    });
};
