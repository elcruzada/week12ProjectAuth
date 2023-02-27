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
//booking conflicts date refactor
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

    // startDate = new Date(startDate)
    // endDate = new Date(endDate)

    const newDate = new Date()
    const parsedDate = Date.parse(endDate)
    // console.log(newDate)
    if (parsedDate < newDate){
        return  res.status(403).json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
              })
        }

    if (!bookingToFind) {
      return  res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    const spotIdValFromFoundBooking = bookingToFind.toJSON().spotId
    const bookingConflictDates = await Booking.findAll({
        where: {
            id: spotIdValFromFoundBooking
        }
    })

    const convertedConflicts = []
    const errorHandlingObj = {

    }

    for (let i = 0; i < bookingConflictDates.length; i++) {
        let conflict = bookingConflictDates[i]
        // console.log(conflict)
        convertedConflicts.push(conflict.toJSON())
    }

    //key into startDate and endDate
    for (let j = 0; j < convertedConflicts.length; j++) {
        let conflict = convertedConflicts[j]
        // console.log(bookingToFind.id)
        if (conflict.id !== bookingToFind.id) {
            return res.status(403).json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "statusCode": 403
            })

        }
        // console.log(new Date(conflict.startDate).getTime())
        const conflictingStartDate = new Date(conflict.startDate).getTime()
        const conflictingEndDate = new Date(conflict.endDate).getTime()
        const convertedStartDate = new Date(startDate).getTime()
        const convertedEndDate = new Date(endDate).getTime()

        // console.log(conflict.startDate)
        // console.log(conflictingStartDate < new Date(endDate).getTime())

        //error for trying to book between start and end
        if ((conflictingStartDate <= convertedStartDate && conflictingStartDate >= convertedStartDate) &&
        (conflictingEndDate <= convertedEndDate && conflictingEndDate >= convertedEndDate)) {
            return res.status(403).json({
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            })
        }

        //already a booking between start and end
        if (conflictingStartDate > convertedStartDate && conflictingEndDate < convertedEndDate) {
            return res.status(403).json({
                "conflictingDatesError": "There is already a booking between your desired dates"
            })
        }

        //error for booking a start date between reserved start and end dates
        if ((conflictingStartDate <= convertedStartDate) && (conflictingEndDate >= convertedStartDate)) {
            return res.status(403).json({
                "startDate": "Start date conflicts with an existing booking"
            })
        }

        //error for booking an end date between reserved start and end dates
        if ((conflictingEndDate <= convertedEndDate) && (conflictingEndDate >= convertedEndDate)) {
            return res.status(403).json({
                "endDate": "End date conflicts with an existing booking"
            })
        }

    }

    // const convertedBookingQuery = bookingToFind
    // console.log(convertedBookingQuery)

    // bookingToFind
    // console.log(bookingConflictDates)
    // const spotToCompare = await Spot.findOne({
    //     where: {
    //         id: bookingToFind.dataValues.spotId
    //     }
    // })
    // let spotToCompareId = spotToCompare.dataValues.id


    //can loop through the bookings object and convert getTime
    //new Date(theBookingVar.startDate).getTime()
    // console.log(new Date(startDate).getTime()) //output 1924214400000



    // let spotCompareId = spotToCompare.dataValues.id


    // const bookingsConflictDates = await Booking.findAll({
    //     where: {
    //         spotId: spotToCompare.id
    //     }
    // })


    // const conflictErrorHandling = {
    //     errors: {
    //         "Start date conflicts with an existing booking"
    //     }
    // }

    // console.log(bookingsConflictDates)
    // const bookingsConflictDates =  await Booking.findAll({
    //     where: {
    //         spotId: spotCompareId,
    //       startDate: { [Op.lte]: endDate },
    //       endDate: { [Op.gte]: startDate },
    //     },
    //   });
    // await Booking.findAll({
    //         where: {
    //             spotId,
    //             startDate: {
    //               [Op.lte]: endDate
    //               },
    //             endDate: {
    //               [Op.gte]: startDate
    //               },
    //         },


    //   });

    // const bookingsConflictDates = await Booking.findOne({
    //     where: {
    //         id: req.params.bookingId,
    //         [Op.and]: [{

    //             [Op.or]: [

    //                 {
    //                     startDate: {
    //                     [Op.gte]: [startDate, endDate]
    //                     }
    //                 },
    //                 {
    //                     endDate: {
    //                         [Op.lte]: [startDate, endDate]
    //                     }
    //                 }
    //             ]
    //         }]
    //     }
    // })

    // const bookingConflictStart = await Booking.findOne({
    //     where: {
    //         spotId: spotToCompareId,
    //         [Op.and]: {
    //             startDate: {
    //                 [Op.lte]: startDate
    //             },
    //             endDate: {
    //                 [Op.gte]: startDate
    //             }
    //         }
    //     }
    // })

    //   console.log(bookingsConflictDates)
    // if (bookingsConflictDates.length){
    //     // if()
    //     res.status(403).json(
    //         {
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //       }
    //     )
    // }
    // const bookingsConflictDates2 = await Booking.findOne({
    //     where: {
    //         id: req.params.bookingId,
    //         [Op.and]: [
    //             {

    //             [Op.or]: [

    //                 {
    //                     startDate: {
    //                     [Op.gte]: [startDate, endDate]
    //                     }
    //                 },
    //                 {
    //                     endDate: {
    //                         [Op.lte]: [startDate, endDate]
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    //     }
    // })

    // const bookingConflictEnd = await Booking.findOne({
    //     where: {
    //         spotId: spotToCompareId,
    //         [Op.and]:{
    //             startDate: {
    //                 [Op.lte]: endDate
    //             },
    //             endDate: {
    //                 [Op.gte]: endDate
    //             }
    //         }
    //     }
    // })


    // if (bookingsConflictDates) {

    //     return res.status(403).json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //       })
    //     }
    // const resultBookingEdit = {
    //     "id": bookingToFind.id,
    //     "spotId": bookingToFind.spotId,
    //     "userId": bookingToFind.userId,
    //     "startDate": startDate,
    //     "endDate": endDate
    // }

    // if (bookingConflictStart || bookingConflictEnd) {
    //     res.status(403)
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //   "statusCode": 403,
    //   "errors": {
    //     "startDate": "Start date conflicts with an existing booking",
    //     "endDate": "End date conflicts with an existing booking"
    //   }
    //     })
    // }

    bookingToFind.startDate = startDate
    bookingToFind.endDate = endDate
    await bookingToFind.save()

    return res.status(200).json(bookingToFind)
})


router.delete('/:bookingId', [restoreUser, requireAuth], async (req, res) => {
    const bookingToDelete = await Booking.findByPk(req.params.bookingId)

    if (!bookingToDelete) {
        res.status(404)
       return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (bookingToDelete.userId !== req.user.id) {
        // throw new Error('Invalid')
       return res.status(403).json({
        "message": "Forbidden",
        "statusCode": 403
      })
    }

    await bookingToDelete.destroy()

    res.status(200)
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})

module.exports = router
