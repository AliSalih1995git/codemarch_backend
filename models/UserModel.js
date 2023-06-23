const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    trim: true,
  },
  username: {
    type: String,
  },
  Address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  Education: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
