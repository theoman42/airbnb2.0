const express = require("express");
const { Op } = require("sequelize");
const { Booking, Spot } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

router.get("/", requireAuth, async (req, res) => {
  const { user } = req;
  const Bookings = await Booking.scope("owner").findAll({
    where: {
      userId: user.id,
    },
    include: {
      model: Spot,
      attributes: [
        ["id", "id"],
        ["ownerId", "ownerId"],
        ["address", "address"],
        ["city", "city"],
        ["country", "country"],
        ["lat", "lat"],
        ["lng", "lng"],
        ["name", "name"],
        ["price", "price"],
        ["previewImage", "previewImage"],
      ],
    },
  });
  res.json({ Bookings });
});

router.put("/:bookingId", requireAuth, async (req, res) => {
  let { bookingId } = req.params;
  bookingId = parseInt(bookingId);
  const { user } = req;
  const bookingExist = await Booking.scope("owner").findOne({
    where: { id: bookingId },
  });
  if (!bookingExist) {
    let err = new Error("Booking couldn't be found");
    err.status = 404;
    throw err;
  }

  if (bookingExist.userId !== user.id) {
    let err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  if (bookingExist.startDate < today) {
    let err = new Error("Past bookings can't be modified");
    err.status = 400;
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
    res.status(403);
    let error = new Error(
      "Sorry, this spot is already booked for the specified dates"
    );
    error.message =
      "Sorry, this spot is already booked for the specified dates";
    error.errors = {
      startDate: "Start date conflicts with an existing booking",
      endDate: "End date conflicts with an existing booking",
    };
    error.status = 403;
    throw error;
  }

  const booking = await bookingExist.update({
    userId: user.id,
    startDate,
    endDate,
  });

  res.json(booking);
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { user } = req;
  const { bookingId } = req.params;
  const deleteBooking = await Booking.scope("owner").findOne({
    where: { id: bookingId },
  });

  if (!deleteBooking) {
    let err = new Error("Booking couldn't be found");
    err.status = 400;
    throw err;
  }
  const owner = await Spot.findOne({
    where: { id: deleteBooking.spotId },
  });

  if (deleteBooking.userId !== user.id && owner.userId !== user.id) {
    let err = new Error("Authentication Required");
    err.status = 401;
    throw err;
  }
  if (deleteBooking.startDate < today) {
    let err = new Error("Bookings that have been started can't be deleted");
    err.status = 400;
    throw err;
  }
  await deleteBooking.destroy();

  res.json({ message: "Succesfully Deleted", statusCode: 200 });
});

module.exports = router;
