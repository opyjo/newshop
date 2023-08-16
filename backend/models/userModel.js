import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // name of user
    email: { type: String, required: true, unique: true }, // email of user
    password: { type: String, required: true }, // password of user
    isAdmin: { type: Boolean, required: true, default: false }, // is user an admin
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
