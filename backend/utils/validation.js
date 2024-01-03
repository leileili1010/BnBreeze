// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User} = require("../db/models");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateCreateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .isLength({min: 1, max: 50})
    .withMessage('Street address is required within 50 characters'),
  check('city')
    .exists({ checkFalsy: true })
    .isLength({min: 1, max: 20})
    .withMessage('City is required within 20 characters'),
  check('state')
    .exists({ checkFalsy: true })
    .isLength({min: 1, max: 20})
    .withMessage('State is required within 20 characters'),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({min:1, max: 50})
    .withMessage('Country is required within 20 characters'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be within -90 and 90'),
   check('lng')
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({min: 1, max: 50})
    .withMessage('Name is required and must be less than 50 characters'),
    check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: 0})
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
]

const validateCreateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isInt({ min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

const ifSpotExists = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
              message: "Spot couldn't be found"
          })
  } 
  next()
}

const checkAuthorization = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if(spot.toJSON().ownerId != req.user.id) {
    res.status(403);
    return res.json({
        message: "Forbidden"
    })
}
  next()
}

const authEditReview = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  if(review.toJSON().userId != req.user.id) {
    res.status(403);
    return res.json({
        message: "Forbidden"
    })
  }
  next()
}


const ifReviewExists = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    res.status(404);
    return res.json({
              message: "Review couldn't be found"
          })
  } 
  next()
}

module.exports = {
  ifSpotExists, handleValidationErrors, validateCreateSpot, checkAuthorization, validateCreateReview, ifReviewExists, authEditReview 
};