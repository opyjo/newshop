import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.methods.matchPassword = async function (enteredPassword) {
  // compare entered password with hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving user
userSchema.pre("save", async function (next) {
  // if password is not modified, move on
  if (!this.isModified("password")) {
    next();
  }
  // if password is modified, hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
