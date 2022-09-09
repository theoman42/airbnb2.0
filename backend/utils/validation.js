const { validationResult } = require("express-validator");
const { check } = require("express-validator");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  let errorArray = [];
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => {
      errorArray.push(error.msg);
    });

    const err = Error("Validation Error");
    err.errors = errorArray;
    err.status = 400;
    err.title = "Validation Error";

    next(err);
  }
  next();
};

const validateSpotBody = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateReviewBody = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const searchValidation = [
  check("page")
    .isInt({ min: 0 })
    // .optional({ nullable: true })
    .withMessage("Page must be greater than or equal to 0"),
  check("size")
    .isInt({ min: 0 })
    // .optional({ nullable: true })
    .withMessage("Size must be greater than or equal to 0"),
  check("maxLat")
    // .isLatLong()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    // .isLatLong()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  check("maxLong")
    // .isLatLong()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  check("minLong")
    // .isLatLong()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check("minPrice")
    .isDecimal({ min: 0 })
    // .optional({ nullable: true })
    .withMessage("Page must be greater than or equal to 0"),
  check("maxPrice")
    .isDecimal({ min: 0 })
    // .optional({ nullable: true })
    .withMessage("Size must be greater than or equal to 0"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateSpotBody,
  validateReviewBody,
  searchValidation,
};
