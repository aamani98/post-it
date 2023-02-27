const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userfound = await User.findOne({ email });
    if (userfound) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, password: hash });
    const payload = { user: newUser._id };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.status(201).json({
        message: "Registeration Sucessfull",
        data: { token },
      });
    });
  } catch (error) {
    res.status(500).send({ message: "Oops Something Went Wrong!!" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userfound = await User.findOne({ email }).select("+password");
    if (!userfound) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }
    const isMatch = await bcrypt.compare(password, userfound.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }
    const paylod = { user: userfound._id };
    jwt.sign(paylod, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        data: { token },
        message: "Login Successfull",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Oops Something Went Wrong!!" });
  }
};

module.exports = { registerUser, loginUser };
