import userModel from "../models/user.model.js";

export const editBioController = async (req, res) => {
  try {
    const username = req.user.username;
    const { bio } = req.body;

    if (!bio) {
      return res.status(400).json({
        message: "bio required",
      });
    }
    const updatedUser = await userModel
      .findOneAndUpdate({ username }, { bio }, { new: true })
      .select("-password");
    res.status(201).json({
      message: "Bio updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Update Failed",
      error: err.message,
    });
  }
};
