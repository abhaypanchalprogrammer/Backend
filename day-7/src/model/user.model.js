import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "this email already exist"],
  },
  password: String,
});

const userModel = mongoose.model("user_data", userSchema);

export default userModel;
