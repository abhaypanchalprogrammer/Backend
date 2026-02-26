import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "This Username is not available"],
      required: [true, "Username is required"],
      match: [/^\S+$/, "Username cannot contain spaces"],
    },
    name: String,
    email: {
      type: String,
      unique: [true, "This email is already linked with another account"],
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    bio: String,
    profileImage: {
      type: String,
      default: "https://ik.imagekit.io/2xkuqfuep/image.png",
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
