// backend/routes/api/spots.js
const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { ifSpotExists, validateCreateSpot, checkAuthorization, validateCreateReview, validateCreateBooking, checkConflictBooking, validateQuery} = require('../../utils/validation.js');
const {Op} = require('sequelize');
const router = express.Router();


const getSpot = async (spot) => {
    spot = spot.toJSON();

    // avgRating 
    const totalStars = await Review.sum('stars', {
        where: {
            spotId: spot.id
        }
    });

    if (totalStars) {
        const numSpot = await Review.count({
            where: {
                spotId: spot.id
            }
        });
        avgRating = Math.round(totalStars/numSpot*10)/10;
        spot.avgRating = avgRating;
    } else {
        spot.avgRating = "No ratings yet"
    }

    // previewImage
    const image = await SpotImage.findOne({
        where:{
            spotId: spot.id,
            preview: true
        }
    })

    if (image) spot.previewImage = image.url;
    else spot.previewImage = "PreviewImage not found.";

    return spot
}

// Get all Spots
router.get('/', validateQuery, async (req, res) => {
    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    const pagination = {};
    const queryObj = {
        where: {}
    };

    // pagination
    page = page || 1;
    size = size || 20;
    pagination.limit = size;
    pagination.offset = size * (page - 1);

    // query
    if(minLat) {
        queryObj.where.lat = {
            [Op.gte] : minLat
        }
    }

    if(maxLat) {
        queryObj.where.lat = {
            [Op.lte]: maxLat
        }
    }

    if(minLng) {
        queryObj.where.lng = {
            [Op.gte] : minLng
        }
    }

    if(maxLng) {
        queryObj.where.lng = {
            [Op.lte]: maxLng
        }
    }

    if(minPrice) {
        queryObj.where.price = {
            [Op.gte] : minPrice
        }
    }

    if(maxPrice) {
        queryObj.where.price = {
            [Op.lte]: maxPrice
        }
    }

    // get all spots
    const spots = await Spot.findAll({
        ...pagination,
        ...queryObj
    });
    const Spots = [];

    for (let spot of spots) {
        spot = await getSpot(spot);
        Spots.push(spot);
    }

    return res.json({
        Spots,
        page,
        size
    });
})

// Get all Spots owned by the Current User
router.get('/current', async(req, res) => {
    const id = req.user.id;
    const Spots = [];

    let spots = await Spot.findAll({
        where: {
            ownerId: id
        }
    })

    if(spots.length == 0) {
        return res.json({
            message: "The current user does not own any spots."
        })
    } 

    for (let spot of spots) {
        spot = await getSpot(spot);
        Spots.push(spot);
    }

    res.json({Spots});
}) 

// Get details of a Spot from an id
router.get("/:spotId", ifSpotExists, async(req, res) => {
    const spotId = req.params.spotId;

    let spot = await Spot.findByPk(spotId, {
        include: {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }
    });

    spot = spot.toJSON();

    //avgStarRating
    const totalStars = await Review.sum('stars', {
        where: {
            spotId: spotId
        }
    });

    if (totalStars) {
        const numSpot = await Review.count({
            where: {
                spotId: spotId
            }
        });
        const avgStarRating = Math.round(totalStars/numSpot*10)/10;
        spot.avgStarRating = avgStarRating;
    } else {
        spot.avgStarRating = "No ratings yet.";
    }

    // owner
    const owner = await User.findByPk(spot.ownerId, {
        attributes:  ['id', 'firstName', 'lastName']
    });

    if(owner) spot.Owner = owner;

    res.json(spot);
})

// Create a Spot 
router.post("/", [requireAuth, validateCreateSpot], async (req, res) => { 
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const newSpot= await Spot.create({
        ownerId: req.user.id,
        address, 
        city, 
        state, 
        country, 
        lat, 
        lng, 
        name, 
        description, 
        price
      });
      res.status(201);
      res.json(newSpot);
})

// Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", [requireAuth, ifSpotExists, checkAuthorization], async (req, res) => { 
    const userId = req.user.id;
    const spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId);

    // add image
    spot = spot.toJSON();
    const {url, preview} = req.body;
    const newSpotImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })

    res.json({
        id: newSpotImage.id,
        url,
        preview
    })
})

// Edit a Spot
router.put('/:spotId', [requireAuth, ifSpotExists, checkAuthorization, validateCreateSpot], async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId);
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    if (address) spot.address = address;
    if (city) spot.city = city;
    if (state) spot.state = state;
    if (country) spot.country = country;
    if (lat) spot.lat = lat;
    if (lng) spot.lng = lng;
    if (name) spot.name = name;
    if (description) spot.description = description;
    if (price) spot.price = price;

    await spot.save();
    res.json(spot);
})

// Delete a Spot
router.delete('/:spotId', [requireAuth, ifSpotExists, checkAuthorization], async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId);

    await spot.destroy();
    res.json({
        message: "Successfully deleted"
    })
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', [requireAuth, ifSpotExists], async(req, res) => {
    const Reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    res.json({Reviews});
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', [requireAuth, ifSpotExists, validateCreateReview], async(req, res) => {
   // check if user alreay left a review for the spot 
    const oldReviews = await Review.findAll({
        where:{
            spotId: req.params.spotId
        }
    }) 
    
    oldReviews.forEach(oldReview => {
        if (oldReview.userId === req.user.id) {
            res.status(500);
            return res.json({
                message: "User already has a review for this spot"
            })
        }
    })

    // create review
    const {review, stars} = req.body;
    const newReview = await Review.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        review,
        stars
    })
    res.status(201);
    res.json(newReview);
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', [requireAuth, ifSpotExists], async (req, res) => {
    // is owner?
    const spot = await Spot.findByPk(req.params.spotId);
    let Bookings;

    if(spot.toJSON().ownerId != req.user.id) {
        // isOwener = "no";
        Bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
    } else {
        // isOwener = "yes";
        Bookings = await Booking.findAll({
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            where: {
                spotId: req.params.spotId 
            }
        })
    }

    res.json({Bookings})
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', [requireAuth, ifSpotExists, validateCreateBooking, checkConflictBooking], async (req, res) => {
    // check not owner
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot.toJSON().ownerId === req.user.id) {
       res.status(403);
       return res.json({
          message: "Spot must not belong by the current user"
      })
    }

   const {startDate, endDate} = req.body;
   const newBooking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
    })
    res.json(newBooking)
})


module.exports = router;
