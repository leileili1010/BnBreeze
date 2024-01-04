const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const {ifBookingExists, ifPastBooking, authEditBooking, validateCreateBooking, checkConflictBookingEdit, ifBookingStarted} = require('../../utils/validation.js');
const { Booking, Spot, SpotImage } = require('../../db/models');
const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res) => {
    const Bookings = [];
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            }
        }
    })

   for (let booking of bookings) {
        booking = booking.toJSON();
        const previewImage = await SpotImage.findOne({
            where:{
                spotId: booking.Spot.id,
                preview: true
            }
        })

        if (previewImage) booking.Spot.previewImage = previewImage.url;
        else booking.Spot.Spot.previewImage = "previewImage not Found.";
        Bookings.push(booking);
   }

    res.json({Bookings});
})

// Edit a Booking
router.put('/:bookingId', [requireAuth, ifBookingExists, authEditBooking, ifPastBooking, validateCreateBooking, checkConflictBookingEdit], async(req, res) => {
    const {startDate, endDate} = req.body;
    const booking = await Booking.findByPk(req.params.bookingId);
    
    if(startDate) booking.startDate = startDate;
    if (endDate) booking.endDate = endDate
    
    await booking.save();
    res.json(booking);
})

// Delete Booking
router.delete('/:bookingId', [requireAuth, ifBookingExists, authEditBooking, ifBookingStarted], async(req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    await booking.destroy();
    res.json({
        message: "Successfully deleted"
    })

})

module.exports = router;