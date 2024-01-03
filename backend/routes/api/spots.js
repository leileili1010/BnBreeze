// backend/routes/api/spots.js
const express = require('express');
const { Spot, Review, SpotImage, User} = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js') 
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateCreateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .isLength({min: 1, max: 50})
      .withMessage('Street address is required within 50 characters.'),
    check('city')
      .exists({ checkFalsy: true })
      .isLength({min: 1, max: 20})
      .withMessage('City is required within 20 characters.'),
    check('state')
      .exists({ checkFalsy: true })
      .isLength({min: 1, max: 20})
      .withMessage('State is required within 20 characters.'),
    check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({min:1, max: 50})
      .withMessage('Country is required within 20 characters.'),
    check('lat')
      .exists({ checkFalsy: true })
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be within -90 and 90.'),
     check('lng')
      .exists({ checkFalsy: true })
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be within -180 and 180.'),
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({min: 1, max: 50})
      .withMessage('Name is required and must be less than 50 characters.'),
      check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Description is required.'),
    check('price')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isFloat({ min: 0})
      .withMessage('Price per day must be a positive number.'),
    handleValidationErrors
]

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
    else spot.previewImage = "PreviewImage is not available now.";

    return spot
}

const ifSpotExists = (spot, res) => {
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
}

const validateAuthorization = (spot, userId, res) => {
    if(spot.toJSON().ownerId != userId) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }
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
router.get("/:spotId", async(req, res) => {
    const spotId = req.params.spotId;

    let spot = await Spot.findByPk(spotId, {
        include: {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }
        
    });

    if (!spot) {
            res.status(404);
            return res.json({
                message: "Spot couldn't be found"
            })
    }

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

      res.json(newSpot);
})

// Add an Image to a Spot based on the Spot's id // authorization?? order?
router.post("/:spotId/images", requireAuth, async (req, res) => { 
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    // check if spot exists? 
    ifSpotExists(spot, res);

    // check authorization
    validateAuthorization(spot, userId, res);

    // add image
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
router.put('/:spotId', [requireAuth, validateCreateSpot], async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId);

    // check if spot exists? 
    ifSpotExists(spot, res);

    // check authorization
    validateAuthorization(spot, userId, res);

    // edit spot
    spot = spot.toJSON();
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

    res.json(spot);
})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId);

    // check if spot exists? 
    ifSpotExists(spot, res);

    // check authorization
    validateAuthorization(spot, userId, res);

    await spot.destroy();
    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;