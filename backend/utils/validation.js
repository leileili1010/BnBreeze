// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User, Booking, ReviewImage} = require("../db/models");
const { Op } = require("sequelize");
const user = require('../db/models/user');

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

const validateQuery = [
  check('page').optional()
    .isInt({ min: 1, max: 10})
    .withMessage('Page must be within 1~10'),
  check('size').optional()
    .isInt({ min: 1, max: 20})
    .withMessage('Size must be within 1~20'), 
  check('maxLat').optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Maximum latitude is invalid'),
  check('minLat').optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Minimum latitude is invalid'),
  check('minLng').optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Minimum longitude is invalid'),
  check('maxLng').optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Maximum longitude is invalid'),
  check('minPrice').optional()
    .isFloat({min: 0})
    .withMessage('Minimum price must be greater than or equal to 0'), 
  check('maxPrice').optional()
    .isFloat({min: 0})
    .withMessage('Maximum price must be greater than or equal to 0'), 
  handleValidationErrors
]

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
  check('lat').optional()
    // .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be within -90 and 90'),
   check('lng').optional()
    // .exists({ checkFalsy: true })
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

const validateCreateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .custom(value => {
      const today = new Date().toISOString().slice(0, 10);
      return new Date(value).getTime() >= new Date(today).getTime();
    })
    .withMessage('startDate cannot be in the past'),
  check('endDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .custom((value, {req}) => {
      const startDate = req.body.startDate;
      return new Date(value).getTime() > new Date(startDate).getTime();
    })
    .withMessage('endDate cannot be on or before startDate'),
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

const checkConflictBooking = async(req, res, next) => {
  let {startDate, endDate} = req.body;
  
  const startDate_ms = new Date(new Date(startDate).toISOString().slice(0, 10)).getTime();
  const endDate_ms = new Date(new Date(endDate).toISOString().slice(0, 10)).getTime();

  const bookings = await Booking.findAll({
    where: {
        spotId: req.params.spotId
    },
    attributes: ['startDate', 'endDate']
   })

   const errors = {};
   for (let booking of bookings) {
        let existingStartDate_ms = new Date(new Date(booking.toJSON().startDate).toISOString().slice(0, 10)).getTime();
        let existingEndDate_ms = new Date(new Date(booking.toJSON().endDate).toISOString().slice(0, 10)).getTime();

        if (startDate_ms === existingStartDate_ms || startDate_ms === existingEndDate_ms || (startDate_ms > existingStartDate_ms && startDate_ms < existingEndDate_ms)) {
          errors.startDate = "Start date conflicts with an existing booking";
        }
    
        if (endDate_ms === existingEndDate_ms || endDate_ms === existingStartDate_ms ||(endDate_ms > existingStartDate_ms && endDate_ms < existingEndDate_ms)) {
          errors.endDate = "End date conflicts with an existing booking";
        }

       if ((existingStartDate_ms > startDate_ms && existingStartDate_ms < endDate_ms && existingEndDate_ms < endDate_ms) || (startDate_ms > existingStartDate_ms && startDate_ms < existingEndDate_ms && endDate_ms < existingEndDate_ms)) {
        errors.startDate =  "Start date conflicts with an existing booking";
        errors.endDate = "End date conflicts with an existing booking";
        break;
       }
   }

   if (Object.keys(errors).length > 0) {
        res.status(403);
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors,
        })
   }
   next();
}

const checkConflictBookingEdit = async (req, res, next) => {
  let {startDate, endDate} = req.body;
  const startDate_ms = new Date(new Date(startDate).toISOString().slice(0, 10)).getTime();
  const endDate_ms = new Date(new Date(endDate).toISOString().slice(0, 10)).getTime();

  const currentbooking = await Booking.findByPk(req.params.bookingId);
  const bookings = await Booking.findAll({
    where: {
      spotId: currentbooking.toJSON().spotId,
      id: {
        [Op.not]: req.params.bookingId
      }
    },
    attributes: ['id', 'startDate', 'endDate']
  })
  console.log(bookings);

  const errors = {};
  for (let booking of bookings) {
    let existingStartDate_ms = new Date(new Date(booking.toJSON().startDate).toISOString().slice(0, 10)).getTime();
    let existingEndDate_ms = new Date(new Date(booking.toJSON().endDate).toISOString().slice(0, 10)).getTime();

    if (startDate_ms === existingStartDate_ms || startDate_ms === existingEndDate_ms || (startDate_ms > existingStartDate_ms && startDate_ms < existingEndDate_ms)) {
      errors.startDate = "Start date conflicts with an existing booking";
    }

    if (endDate_ms === existingEndDate_ms || endDate_ms === existingStartDate_ms ||(endDate_ms > existingStartDate_ms && endDate_ms < existingEndDate_ms)) {
      errors.endDate = "End date conflicts with an existing booking";
    }

    if ((existingStartDate_ms > startDate_ms && existingStartDate_ms < endDate_ms && existingEndDate_ms < endDate_ms) || (startDate_ms > existingStartDate_ms && startDate_ms < existingEndDate_ms && endDate_ms < existingEndDate_ms)) {
      errors.startDate = "Start date conflicts with an existing booking";
      errors.endDate = "End date conflicts with an existing booking";
      break;
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors,
    })
  }
  next();

}

const ifBookingExists = async(req, res, next) => {
   const booking = await Booking.findByPk(req.params.bookingId);
   if(!booking) {
    res.status(404);
    return res.json({
              message: "Booking couldn't be found"
          })
   }
   next();
}

const ifPastBooking = async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  const today = new Date().toISOString().slice(0, 10);
  const today_ms = new Date(today).getTime();

  const endDate = new Date(booking.toJSON().endDate).toISOString().slice(0, 10);
  const endDate_ms = new Date(today).getTime();
  
  if (today_ms > endDate_ms) {
      res.status(403);
      return res.json({
        message: "Past bookings can't be modified"
    })
  }
  next();
}

const authEditBooking = async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  if(booking.toJSON().userId != req.user.id) {
    res.status(403);
    return res.json({
        message: "Forbidden"
    })
  }
  next()
}

const ifBookingStarted = async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  const today = new Date().toISOString().slice(0, 10);
  const today_ms = new Date(today).getTime();
  // console.log('today', " ", today, " ", today_ms);

  const startDate = new Date(booking.toJSON().startDate).toISOString().slice(0, 10);
  const startDate_ms = new Date(startDate).getTime(); 
  // console.log('startDate', " ", startDate, " ", startDate_ms);

  if (startDate_ms <= today_ms) {
    res.status(403);
    return res.json({
        message: "Bookings that have been started can't be deleted"
    })
  }
  next();
}

const spotImageExists = async (req, res, next) => {
  const spotImage = await SpotImage.findByPk(req.params.imageId);
  if(!spotImage) {
    res.status(404);
    return res.json({
              message: "Spot Image couldn't be found"
          })
   }
   next()
}

const authDeleteSpotImage = async (req, res, next) => {
  const spotImage = await SpotImage.findByPk(req.params.imageId);
  const spot = await Spot.findByPk(spotImage.toJSON().spotId);
  if (spot.toJSON().ownerId != req.user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden"
    })
  }
  next()
}

const reviewImageExists = async (req, res, next) => {
  const reviewImage = await ReviewImage.findByPk(req.params.imageId);
  if(!reviewImage) {
    res.status(404);
    return res.json({
              message: "Review Image couldn't be found"
          })
   }
   next()
}

const authDeleteReviewImage = async (req, res, next) => {
  const reviewImage = await ReviewImage.findByPk(req.params.imageId);
  const review = await Review.findByPk(reviewImage.toJSON().reviewId);
  if (review.toJSON().userId != req.user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden"
    })
  }
   next()
}

const ifOldReview = async (req, res, next) => {
  // check if user alreay left a review for the spot 
  const oldReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    }
  })

  for (let oldReview of oldReviews) {
    if (oldReview.userId === req.user.id) {
      res.status(500);
      return res.json({
        message: "User already has a review for this spot"
      })
    }
  }
  next();
}

const checkUserExistence = async (req, res, next) => {
  const {email, username} = req.body;
  const users = await User.findAll({
    attributes: ['username', 'email']
  })

  const errors = {}
  for (let user of users) {
    if (email == user.email) {
      errors.email = "User with that email already exists"
    }
    if (username == user.username) {
      errors.username = "User with that username already exists"
    }

    if (email == user.email && username == user.username) {
      errors.email = "User with that email already exists";
      errors.username = "User with that username already exists";
      break;
    }
  }

  if(Object.keys(errors).length > 0) {
    res.status (500);
    return res.json({
      message: "User alreay exists",
      errors
    })
  }

  next();
}

module.exports = {
  checkUserExistence, ifSpotExists, handleValidationErrors, validateCreateSpot, checkAuthorization, validateCreateReview, ifReviewExists, authEditReview, validateCreateBooking, checkConflictBooking, ifBookingExists, ifPastBooking, authEditBooking, checkConflictBookingEdit, ifBookingStarted, spotImageExists, authDeleteSpotImage, reviewImageExists, authDeleteReviewImage, validateQuery,ifOldReview 
};