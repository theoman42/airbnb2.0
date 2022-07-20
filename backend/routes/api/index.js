// backend/routes/api/index.js
const router = require("express").Router();
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");
const usersRouter = require("./users.js");
const { User } = require("../../db/models");

router.use("/users", usersRouter);

//Restore User Session
router.get("/", restoreUser, (req, res) => {
  res.send("Welcome to Airbnb");
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

// Add a XSRF-TOKEN cookie
router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
