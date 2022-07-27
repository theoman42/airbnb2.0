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

//GET ALL REVIEWS WRITTEN BY CURRENT USER
router.get("/", requireAuth, async (req, res) => {
  const { user } = req;
  const Reviews = await Review.findAll({
    where: {
      userId: user.id,
    },
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
  res.json({ Reviews });
});

//Add an Image to a REVIEW based on the REVIEW's ID
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { user } = req;
  const { url } = req.body;
  let { reviewId } = req.params;
  reviewId = parseInt(reviewId);

  const reviewExist = await Review.findOne({
    where: { id: reviewId },
  });

  if (!reviewExist) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    throw err;
  }

  if (reviewExist.userId !== user.id) {
    let error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  const newImage = await Image.create({
    imageableId: user.id,
    spotId: null,
    reviewId,
    url,
    imageType: "Review",
  });

  res.json({
    id: newImage.id,
    imageableId: user.id,
    imageableType: "Review",
    url: newImage.url,
  });
});

//DELETE A REVIEW
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { user } = req;
  let { reviewId } = req.params;
  reviewId = parseInt(reviewId);

  const reviewExist = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if (!reviewExist) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    throw err;
  }

  if (reviewExist.userId !== user.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  await reviewExist.destroy();
  res.json({
    message: "Succesfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
