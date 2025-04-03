const { hash, compare } = require("bcrypt");
const { User } = require("../models/user");
const { sign } = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");
require("dotenv").config();

const serverError = "Internal Server Error";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: serverError });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: serverError });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "User is Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: serverError });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password, country, phone } = req.body;
    const requestUser = {};
    const user = await User.findById(req.params.id);
    const comparePassword = await compare(password, user.password);
    if (!comparePassword) res.status(400).json({ msg: "Invalid Password" });
    username && (requestUser.username = username);
    country && (requestUser.country = country);
    phone && (requestUser.phone = phone);
    password && (requestUser.password = await hash(password, 10));
    email && (requestUser.email = email);
    if (!requestUser) return res.status(400).json({ msg: "No Data is Sent" });
    await user.updateOne(requestUser);
    await user.save();
    return res.status(200).json({ msg: "User is Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: serverError });
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      country,
      role,
      shopName,
      shopDescription,
    } = req.body;
    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      country,
      role,
      shopName,
      shopDescription,
    });
    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: serverError });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(404).json({ msg: "Email and Password are Requireds" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Email" });
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
    const token = sign({ id: user._id, role: user.role }, process.env.jwt, {
      expiresIn: "30d",
    });
    res
      .cookie(
        "token",
        JSON.stringify(
          { token: token, _id: user._id, role: user.role },
          {
            maxAge: "10d",
            secure: true,
            sameSite: "strict",
            httpOnly: false,
          }
        )
      )
      .json({ msg: "Login is Done", token: token, _id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: serverError });
  }
};

const sendOTP = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Invalid Email" });

    const otp = await sendMail(req.body.email);
    await res.cookie("otp", otp, { httpOnly: false, secure: false });

    await res.cookie("email", email, { httpOnly: false, secure: false });

    return res.status(201).json({ msg: "OTP Sent Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: serverError });
  }
};

const updatePassword = async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ msg: "Invalid Email" });
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword }
    );
    return res.status(200).json({ msg: "Password is Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: serverError });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  registerUser,
  login,
  sendOTP,
  updatePassword,
};
