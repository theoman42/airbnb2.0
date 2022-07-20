// backend/routes/index.js
const express = require("express");
const router = express.Router();
const { restoreUser } = require("../utils/auth");
const apiRouter = require("./api");

router.use(apiRouter);

module.exports = router;
