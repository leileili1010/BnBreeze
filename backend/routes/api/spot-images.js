const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { spotImageExists, authDeleteSpotImage } = require('../../utils/validation.js');
const { SpotImage } = require('../../db/models');
const router = express.Router();

router.delete('/:imageId', [requireAuth, spotImageExists, authDeleteSpotImage], async(req, res) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId);
    await spotImage.destroy();
    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;