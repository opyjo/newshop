import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user and get token
// @route   POST /api/users/auth
// @access  Private
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // create token
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//desc Register a new user
//route POST /api/users
//access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //create user
  const user = await User.create({ name, email, password });
  if (user) {
    // create token
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//desc Logout user / clear cookie
//route POST /api/users/logout
//access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out successfully" });
});

//desc Get user profile
//route GET /api/users/profile
//access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // if user exists, return user
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    // if user does not exist, throw error
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//desc Update user profile
//route PUT /api/users/profile
//access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // if user exists, update user
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // if password is updated, hash password
    if (req.body.password) {
      user.password = req.body.password;
    }
    // save updated user
    const updatedUser = await user.save();
    // return updated user
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
    // if user does not exist, throw error
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//desc Get all users
//route GET /api/v1/users
//access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//desc Get user by id
//route GET /api/users/:id
//access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//desc Delete user
//route DELETE /api/users/:id
//access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//desc Update user
//route PUT /api/users/:id
//access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  registerUser,
};
