const { User } = require("../models/user");

const findAll = (object) => {
  return async (req, res, next) => {
    const all = await object.find();
    if (!all.length) return res.status(404).json({ msg: "Not Found" });
    next();
  };
};

const findOneById = (object) => {
  return async (req, res, next) => {
    const single = await object.findById(req.params.id);
    if (!single) return res.status(404).json({ msg: "Not Found" });
    next();
  };
};

const findUserEmail = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ msg: "This Email is already exist" });
  next();
};

const checkAdmin = async (req, res, next) => {
  const user = await User.findById(req.headers.id);
  if (user.role !== "admin")
    return res.status(400).json({ msg: "Access is denied you are not admin" });
  next();
};

const checkVendor = async (req, res, next) => {
  const user = await User.findById(req.headers.id);
  if (user.role !== "vendor")
    return res.status(400).json({ msg: "Access is denied you are not vendor" });
  next();
};

module.exports = {
  findAll,
  findOneById,
  findUserEmail,
  checkAdmin,
  checkVendor,
};
