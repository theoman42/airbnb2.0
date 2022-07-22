// backend/routes/api/index.js
const router = require("express").Router();
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const reviewsRouter = require("./reviews.js");
const { User } = require("../../db/models");

router.use("/users", usersRouter);
router.use("/spots", spotsRouter);
router.use("/reviews", reviewsRouter);

//Restore User Session
router.get("/", restoreUser, (req, res) => {
  //res.send("Welcome to Airbnb");
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

module.exports = router;
