const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

//register
exports.register = async (req, res) => {
  try {
    const isExist = await UserModel.findOne({ email: req.body.email });
    if (isExist) {
      throw new Error("Already such an account with this email.try new one!");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await new UserModel({
      email: req.body.email,
      password: hashedPassword,
    }).save();
    const { password, ...others } = newUser._doc;
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//login
exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const check = await bcrypt.compare(req.body.password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const { password, ...others } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.send({
      others,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Login with google
exports.logInWithGoogle = async (req, res) => {
  try {
    const { email, verified_email, name, id } = req.body.data;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      const { password, ...others } = existingUser._doc;
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log("isExist");
      return res.send({ others, token });
    } else {
      const hashedPassword = await bcrypt.hash(id, 10);
      const newUser = await new UserModel({
        email,
        name,
        password: hashedPassword,
      }).save();
      const { password, ...others } = newUser._doc;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log("no user");
      return res.status(201).json({ others, token });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Add profile
exports.addProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, Address, phoneNumber, Education } = req.body.userData;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.Address = Address;
    user.phoneNumber = phoneNumber;
    user.Education = Education;

    const updatedUser = await user.save();
    return res
      .status(200)
      .json({ updatedUser, message: "Update Profile Successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await UserModel.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
