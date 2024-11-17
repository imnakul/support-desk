//bsically a schema for all users

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please add a name"],
      },
      email: {
         type: String,
         required: [true, " Please add an email"],
      },
      password: {
         type: String,
         required: [true, " Please add a password"],
      },
      //for development mode ONLY, to remember password for user by looking at database, below field.. remove in production
      passwordToRemember: {
         type: String,
      },
      isAdmin: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("User", userSchema);
