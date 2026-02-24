import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Follower id required"],
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Followee id required"],
  },
});

const followModel = mongoose.model("follow", followSchema);

export default followModel;
