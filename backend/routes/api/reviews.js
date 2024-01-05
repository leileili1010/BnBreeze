// backend/routes/api/reviews.js
const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { ifReviewExists, validateCreateReview, authEditReview  } = require('../../utils/validation.js');
const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const Reviews = []

    let reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    for (let review of reviews) {
        review = review.toJSON();
        const previewImage = await SpotImage.findOne({
            where:{
                spotId: review.Spot.id,
                preview: true
            }
        })

        if (previewImage) review.Spot.previewImage = previewImage.url;
        else review.Spot.previewImage = "previewImage not Found.";
        Reviews.push(review);
    }
     
    res.json({Reviews})
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', [requireAuth, ifReviewExists, authEditReview], async(req, res) => {
    // check max 10 reviewImages
    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })

    if (reviewImages.length >= 10) {
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    // add image to review
    const {url} = req.body;
    const newReviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    })
    res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
})

// Edit a Review
router.put('/:reviewId', [requireAuth, ifReviewExists, authEditReview,validateCreateReview], async(req, res) => {
    const {review, stars} = req.body;
    const reviewToUpdate = await Review.findByPk(req.params.reviewId);
    
    if (review) reviewToUpdate.review = review;
    if (stars) reviewToUpdate.stars = stars;
    await reviewToUpdate.save();

    res.json(reviewToUpdate);
})

// Delete a Review
router.delete('/:reviewId', [requireAuth, ifReviewExists, authEditReview], async(req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    await review.destroy();
    res.json({
        message: "Successfully deleted"
    })
})


module.exports = router;