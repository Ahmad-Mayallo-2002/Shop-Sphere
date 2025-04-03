const { Router } = require("express");
const {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  login,
  registerUser,
  sendOTP,
  updatePassword,
} = require("../controller/user");
const { findOneById, findAll, findUserEmail } = require("../middlewares/find");
const { User } = require("../models/user");
const { authorization } = require("../middlewares/authorization");

const router = Router();

router.get("/get-users", authorization, findAll(User), getAllUsers);

router.get("/get-users/:id", authorization, findOneById(User), getSingleUser);

router.delete("/delete-user/:id", authorization, findOneById(User), deleteUser);

router.patch(
  "/update-user/:id",
  authorization,
  findOneById(User),
  findUserEmail,
  updateUser
);

router.post("/login", login);

router.post("/register", findUserEmail, registerUser);

router.post("/send-otp", sendOTP);

router.patch("/update-password", updatePassword);

module.exports = router;
