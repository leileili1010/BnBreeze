// backend/routes/api/spots.js
const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage} = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { ifSpotExists, validateCreateSpot, checkAuthorization, validateCreateReview } = require('../../utils/validation.js');

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
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    const Spots = [];

    for (let spot of spots) {
        spot = await getSpot(spot);
        Spots.push(spot);
    }

    return res.json({Spots});
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


module.exports = router;