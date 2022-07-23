const express = require("express");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { User, Spot, Review, Booking, Image } = require("../../db/models");
const {
  requireAuth,
  properAuthorization,
  setTokenCookie,
} = require("../../utils/auth");
const { check } = require("express-validator");
const {
  searchValidation,
  handleValidationErrors,
  validateSpotBody,
  validateReviewBody,
} = require("../../utils/validation");
const spot = require("../../db/models/spot");
const user = require("../../db/models/user");

const router = express.Router();

//Add an Image to a SPOT based on the SPOT's ID
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { user } = req;
  const { url } = req.body;
  let { spotId } = req.params;
  spotId = parseInt(spotId);

  const spotExist = await Spot.findOne({
    where: { id: spotId },
  });

  if (!spotExist) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  if (spotExist.ownerId !== user.id) {
    let error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  const newImage = await Image.create({
    imageableId: user.id,
    spotId,
    reviewId: null,
    url,
    imageType: "Spot",
  });

  res.json({
    id: newImage.id,
    imageableId: user.id,
    imageableType: "Spot",
    url: newImage.url,
  });
});

//GET ALL BOOKINGS from SPOT ID
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const { user } = req;
  let { spotId } = req.params;
  spotId = parseInt(spotId);

  const spotExist = await Spot.findOne({
    where: { id: spotId },
  });

  if (!spotExist) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }
  let Bookings;
  if (spotExist.ownerId === user.id) {
    Bookings = await Booking.scope("owner").findAll({
      where: {
        spotId,
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
  } else {
    Bookings = await Booking.findAll({
      where: {
        spotId,
      },
    });
  }
  return res.json({ Bookings });
});

//BOOKING A SPOT based on SPOT's ID

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  let { spotId } = req.params;
  const { user } = req;
  spotId = parseInt(spotId);
  const spotExist = await Spot.findOne({ where: { id: spotId } });
  if (!spotExist) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }
  if (spotExist.ownerId === user.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  let { startDate, endDate } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const conflict = await Booking.findAll({
    where: {
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          endDate: {
            [Op.between]: [startDate, endDate],
          },
        },
      ],
    },
  });

  if (conflict.length) {
    let err = new Error(
      "Sorry, this spot is already booked for the specified dates"
    );
    err.status = 403;
    err.errors = {
      startDate: "Start date conflicts with an existing booking",
      endDate: "End date conflicts with an existing booking",
    };
    throw err;
  }

  const booking = await Booking.create({
    spotId,
    userId: user.id,
    startDate,
    endDate,
  });

  res.json(booking);
});

//GET ALL REVIEWS by a SPOT's ID
router.get("/:spotId/reviews", async (req, res) => {
  let { spotId } = req.params;
  spotId = parseInt(spotId);
  const reviews = await Review.findAll({
    where: {
      spotId,
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
      {
        model: Image,
        as: "images",
        attributes: ["url", "url"],
      },
    ],
  });
  res.json({ reviews });
});

//CREATE A REVIEW For SPOT Based on ID
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReviewBody,
  async (req, res) => {
    let { spotId } = req.params;
    const { user } = req;
    const { review, stars } = req.body;
    spotId = parseInt(spotId);

    const spotExist = await Spot.findOne({
      where: {
        id: spotId,
      },
    });

    const reviewExist = await Review.findOne({
      where: {
        spotId,
        userId: user.id,
      },
    });

    if (!spotExist) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      throw err;
    }
    if (reviewExist) {
      const err = new Error("User already has a review for this spot");
      err.status = 403;
      throw err;
    }

    const copy = await Review.create({
      userId: user.id,
      spotId,
      review,
      stars,
    });

    res.json(copy);
  }
);

//EDIT REVIEW
router.put(
  "/:spotId/reviews/:reviewId",
  requireAuth,
  validateReviewBody,
  async (req, res) => {
    const { user } = req;
    let { reviewId } = req.params;
    const { review, stars } = req.body;
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
      const err = new Error("Forbidden");
      err.status = 403;
      throw err;
    }

    await Review.update(
      {
        review,
        stars,
      },
      {
        where: {
          id: reviewId,
        },
      }
    );

    const updatedReview = await Review.findOne({
      where: {
        id: reviewId,
      },
    });
    res.json(updatedReview);
  }
);

//DELETE A REVIEW
router.delete("/:spotId/reviews/:reviewId", requireAuth, async (req, res) => {
  const { user } = req;
  let { spotId, reviewId } = req.params;
  spotId = parseInt(spotId);
  reviewId = parseInt(reviewId);

  const reviewExist = await Review.findOne({
    where: {
      id: reviewId,
      spotId,
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

  await reviewExist.destroy;
  throw err;
});

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
  let { spotId } = req.params;
  spotId = parseInt(spotId);

  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }
  if (user.id !== spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
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
  let { spotId } = req.params;
  spotId = parseInt(spotId);
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
        attributes: ["url", "url"],
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
    throw err;
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
  let { spotId } = req.params;
  spotId = parseInt(spotId);

  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }
  if (user.id !== spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
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

//SEARCH
router.get("/search", searchValidation, async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  if (!size) size = 20;
  if (!page) page = 0;

  page = parseInt(page);
  size = parseInt(size);

  page > 10 ? (page = 0) : (page = page);
  size > 20 ? (size = 20) : (size = size);

  let where = {};

  //LATTITUDE
  if (minLat) {
    where.lat = {
      [Op.gte]: minLat,
    };
  }

  if (maxLat) {
    where.lat = {
      [Op.lte]: maxLat,
    };
  }
  // LONGITUDE
  if (minLng) {
    where.lng = {
      [Op.gte]: minLng,
    };
  }

  if (maxLng) {
    where.lng = {
      [Op.lte]: maxLng,
    };
  }

  // PRICE
  if (minPrice) {
    where.price = {
      [Op.gte]: minPrice,
    };
  }

  if (maxPrice) {
    where.price = {
      [Op.lte]: maxPrice,
    };
  }

  const Spots = await Spot.findAll({
    where: { ...where },
    include: [
      {
        model: Image,
        as: "images",
        attributes: ["url"],
      },
    ],
  });

  res.status(200);
  return res.json({ Spots, page, size });
});

module.exports = router;
