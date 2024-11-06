const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// @desc  Register a new User
// @route  /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   //Validation
   if (!name || !email || !password) {
      res.status(400);
      throw new Error(" Please include all fields");
   }

   //Find if user already exists
   const userExists = await User.findOne({ email: email });
   // or const userExists = await User.findOne({email}) same meaning

   if (userExists) {
      res.status(400);
      throw new Error("User Already exists!");
   }

   //Hash Password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   //Create user
   const user = await User.create({
      name,
      email,
      password: hashedPassword,
   });

   // if user created
   if (user) {
      res.send(201).json({
         _id: user.id,
         name: user.name,
         email: user.email,
      });
   } else {
      res.status(400);
      throw new error("Invalid user data");
   }
});

// @desc  Login a User
// @route  /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
   res.send("Login Route");
});

module.exports = {
   registerUser,
   loginUser,
};
