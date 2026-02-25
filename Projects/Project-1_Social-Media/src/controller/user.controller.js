import followModel from "../models/follow.model.js";
import userModel from "../models/user.model.js";

export const followUserController = async (req, res) => {
  try {
    const followerUsername = req.user.username;
    const followeeUserName = req.params.username;
    if (followeeUserName === followerUsername) {
      return res.status(404).json({
        message: "You cant follow your self",
      });
    }
    const isUserExist = await userModel.findOne({
      username: followeeUserName,
    });
    if (!isUserExist) {
      return res.status(403).json({
        message: `${followeeUserName} is not exists`,
      });
    }
    const isAlreadyFollowed = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUserName,
    });
    if (isAlreadyFollowed) {
      return res.status(403).json({
        message: "already followed",
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
