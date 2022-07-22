const express = require("express");
const sequelize = require("sequelize");
const { User, Spot, Review, Booking, Image } = require("../../db/models");
const {
  requireAuth,
  properAuthorization,
  setTokenCookie,
} = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    include: [
      {
        model: User,
        attributes: [
          ["id", "id"],
          ["firstName", "firstName"],
          ["lastName", "lastName"],
        ],
      },
    ],
  });
  res.json({ reviews });
});

module.exports = router;
