const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get('/current', [restoreUser, requireAuth], async (req, res) => {
    const currentUserBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        // attributes: {
        //     exclude: ['spotId']
        // },
        include: [
                    {
                    model: Spot,
                    attributes:
                    {
                        exclude: ['description']
                    },
                    }
                ]
    })

    const currentUserBookingsObject = []
    for (let i = 0; i < currentUserBookings.length; i++) {
        const booking = currentUserBookings[i]
        currentUserBookingsObject.push(booking.toJSON())
    }

    // console.log(currentUserBookingsObject)

    for (let i = 0; i < currentUserBookingsObject.length; i++) {
        let bookingSpot = currentUserBookingsObject[i].Spot

        const spotPreview = await SpotImage.findAll({
            where: {
                spotId: bookingSpot.id
            }
        })

        let previewImageURL = spotPreview[0].dataValues.url
        let previewImageTruthiness = spotPreview[0].dataValues.preview

        // console.log(previewImageURL)

        if (previewImageURL && previewImageTruthiness) {
            bookingSpot.previewImage = previewImageURL
        }
    }

    //still need previewImage for Spot
    res.status(200).json(currentUserBookingsObject)
})





module.exports = router
