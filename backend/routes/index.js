// backend/routes/index.js
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.get("/", (req, res) => {
  res.send("Welcome to Airbnb");
});

router.use("/api", apiRouter);

module.exports = router;
