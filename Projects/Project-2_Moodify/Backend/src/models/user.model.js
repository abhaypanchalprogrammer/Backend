import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "User with this usename is already exists"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "User with this Email address already exists"],
  },
  password: {
    type: String,
    required: [true, "password is requires"],
    select: false,
  },
  //   userSchema.pre('save',()=>{})
  //   userSchema.post('save',()=>{})
});

export const userModel = mongoose.model("User", userSchema);
