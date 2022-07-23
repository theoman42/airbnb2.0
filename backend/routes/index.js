// backend/routes/index.js
const express = require("express");
const router = express.Router();
const { restoreUser } = require("../utils/auth");
const apiRouter = require("./api");

router.use(apiRouter);

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

router.get("/", (req, res) => {
  res.json("Aye");
});

module.exports = router;
