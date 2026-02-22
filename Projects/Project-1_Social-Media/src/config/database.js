import mongoose from "mongoose";
const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to database");
  });
};
export default connectToDatabase;
