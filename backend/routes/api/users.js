const express = require("express");

const { requireAuth, setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateSignup = [
  check("email").exists({ checkFalsy: true }).withMessage("Invalid email"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  handleValidationErrors,
];

const validateLogin = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is required."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required."),
  handleValidationErrors,
];

//Get User
router.get("/me", requireAuth, async (req, res) => {
  const { user } = req;
  if (user) return res.json(user.toSafeObject());
  else return res.json();
});

//Login
router.post("/login", validateLogin, async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.login({ email, password });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = "Invalid credentials";
    err.errors = ["The provided crendentials were invalid."];
    res.json({
      message: err.message,
      statusCode: err.status,
    });
  }

  const cookie = await setTokenCookie(res, user);

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: cookie,
  });
});

//Signup
router.post("/signup", validateSignup, async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  //Does User Exist?
  const userExist = await User.findOne({
    where: { email },
  });
  if (userExist) {
    const err = new Error("User already exists");
    err.status = 403;
    err.errors = { email: "User with that email already exists" };
    next(err);
  }
  //
  const user = await User.signup({ email, password, firstName, lastName });
  const cookie = await setTokenCookie(res, user);

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: cookie,
  });
});

//Log Out
router.delete("/logout", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
