const express = require('express');
const router = express.Router();
const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { reviewImageExists, authDeleteReviewImage } = require('../../utils/validation.js');

router.delete('/:imageId', [requireAuth, reviewImageExists, authDeleteReviewImage], async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
    await reviewImage.destroy();
    res.json({
        message: "Successfully deleted"
    })
})


module.exports = router;