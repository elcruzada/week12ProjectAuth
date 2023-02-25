const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {Op} = require('sequelize')

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

//STILL NEED TO DO "past bookings can't be modified"
router.put('/:bookingId', [restoreUser, requireAuth], async (req, res) => {
    const {startDate, endDate} = req.body
    let foundbookingId = req.params.bookingId

    const bookingToFind = await Booking.findByPk(foundbookingId)

    // console.log(bookingToFind)

    if (endDate <= startDate) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
          })
    }

    if (!bookingToFind) {
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }




    const bookingsConflictDates = await Booking.findAll({
          startDate: {
            [Op.lte]: endDate
            },
          endDate: {
            [Op.gte]: startDate
            }

      });

    //   console.log(bookingsConflictDates)
    if (bookingsConflictDates.length){
        res.status(403).json(
            {
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }
          }
        )
    }

    // const resultBookingEdit = {
    //     "id": bookingToFind.id,
    //     "spotId": bookingToFind.spotId,
    //     "userId": bookingToFind.userId,
    //     "startDate": startDate,
    //     "endDate": endDate
    // }

    if (startDate) bookingToFind.startDate = startDate
    if (endDate) bookingToFind.endDate = endDate
    await bookingToFind.save()

    res.status(200).json(bookingToFind)
})


module.exports = router
