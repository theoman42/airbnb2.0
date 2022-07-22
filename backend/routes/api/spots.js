const express = require("express");
const sequelize = require("sequelize");
const { User, Spot, Review, Booking, Image } = require("../../db/models");
const {
  requireAuth,
  properAuthorization,
  setTokenCookie,
} = require("../../utils/auth");
const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateSpotBody,
} = require("../../utils/validation");

const router = express.Router();

//CREATE A NEW SPOT
router.post("/", requireAuth, validateSpotBody, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.json(spot);
});

//EDIT A SPOT
router.put("/:spotId", requireAuth, validateSpotBody, async (req, res) => {
  const { user } = req;
  const { spotId } = req.params;
  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return res.json({
      message: err.message,
      status: err.status,
    });
  }
  if (user.id !== spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return res.json({
      message: err.message,
      status: err.status,
    });
  }

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  await Spot.update(
    {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    },
    {
      where: {
        id: spotId,
      },
    }
  );

  const updatedSpot = await Spot.findOne({
    where: {
      id: spotId,
    },
    attributes: {
      exclude: ["previewImage"],
    },
  });

  res.json(updatedSpot);
});

//GET ALL SPOTS FOR CURRENT USER
router.get("/me", requireAuth, async (req, res) => {
  const { user } = req;
  const spots = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
  });
  res.json({ spots });
});

//GET SPOT BY spotId
router.get("/:spotId", async (req, res) => {
  const id = req.params["spotId"];
  const spot = await Spot.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["previewImage"],
    },
    include: [
      {
        model: Review,
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("review")), "numReviews"],
          [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
        ],
      },
      {
        model: Image,
        as: "images",
        attributes: ["url"],
      },
      {
        model: User,
        as: "Owner",
        attributes: [
          ["id", "id"],
          ["firstName", "firstName"],
          ["lastName", "lastName"],
        ],
      },
    ],
  });
  if (!spot.id) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    res.json({
      message: err.message,
      statusCode: err.status,
    });
  }
  res.json(spot);
});

//GET ALL SPOTS
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({});
  res.json({ spots });
});

//DELETE SPOT

router.delete("/:spotId", requireAuth, async (req, res) => {
  const { user } = req;
  const { spotId } = req.params;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return res.json({
      message: err.message,
      status: err.status,
    });
  }
  if (user.id !== spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 403;
    return res.json({
      message: err.message,
      status: err.status,
    });
  }

  await Spot.destroy({
    where: {
      id: spotId,
    },
  });

  res.json({
    message: "Succesfully Deleted",
    statusCode: 200,
  });
});

module.exports = router;
