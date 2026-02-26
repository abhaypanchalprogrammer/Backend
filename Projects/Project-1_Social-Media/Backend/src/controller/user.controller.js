import followModel from "../models/follow.model.js";
import userModel from "../models/user.model.js";

export const followUserController = async (req, res) => {
  try {
    const followerUsername = req.user.username;
    const followeeUserName = req.params.username;
    const isUserExist = await userModel.findOne({
      username: followeeUserName,
    });
    if (!isUserExist) {
      return res.status(403).json({
        message: `${followeeUserName} is not exists`,
      });
    }
    if (followeeUserName === followerUsername) {
      return res.status(404).json({
        message: "You cant follow yourself",
      });
    }

    const isAlreadyFollowed = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUserName,
    });
    if (isAlreadyFollowed) {
      await followModel.findOneAndDelete({
        follower: followerUsername,
        followee: followeeUserName,
      });
      return res.status(200).json({
        message: "Unfollowed",
        isAlreadyFollowed,
      });
    }
    const followRequst = await followModel.create({
      follower: followerUsername,
      followee: followeeUserName,
    });
    res.status(201).json({
      message: `You are now following ${followeeUserName}`,
      followRequst,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getFollowingDetail = async (req, res) => {
  try {
    const userName = req.params.username;

    const isUserExist = await userModel.findOne({ username: userName });
    if (!isUserExist) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const following = await followModel.find({
      follower: userName,
    });
    res.status(200).json({
      message: "Fetching successful",
      following,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

export const getFollowerDetail = async (req, res) => {
  try {
    const username = req.params.username;
    const followers = await followModel.find({
      followee: username,
    });
    res.status(200).json({
      message: "Followers Fetched",
      count: followers.length,
      followers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
