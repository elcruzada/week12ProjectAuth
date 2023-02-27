const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {Op} = require('sequelize')


const validateEditBooking = [
    check('startDate')
        .exists({checkFalsy: true})
        .withMessage("StartDate is required"),
    check('endDate')
        .exists({checkFalsy: true})
        .withMessage("EndDate is required"),
    handleValidationErrors
];


router.get('/current', [restoreUser, requireAuth], async (req, res) => {

    const currentUserBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
            model: Spot,
            attributes: {
            exclude:
                [
                'description', 'createdAt', 'updatedAt'
            ]
        },
            include: [
                {
                model: SpotImage,
                attributes: ['url', 'preview']
            }
        ]
        }]
    })

    // const currentUserBookingsObject = []
    // for (let i = 0; i < currentUserBookings.length; i++) {
    //     const booking = currentUserBookings[i]
    //     currentUserBookingsObject.push(booking.toJSON())
    // }

    // // console.log(currentUserBookingsObject)

    // for (let j = 0; j < currentUserBookingsObject.length; j++) {
    //     let bookingSpot = currentUserBookingsObject[j].Spot
    //     // console.log(bookingSpot)
    //     const spotPreview = await SpotImage.findOne({
    //         where: {
    //             spotId: bookingSpot.id
    //         }
    //     })

    //     console.log(spotPreview)

    //     // let previewImageURL = spotPreview.dataValues.url
    //     // let previewImageTruthiness = spotPreview.dataValues.preview
    //     // const spotPreviewObject = []
    //     // // console.log(spotPreviewObject.push(spotPreview))
    //     // for (let preview of spotPreview) {
    //     //     spotPreviewObject.push(preview.toJSON())
    //     // }
    //     // console.log(spotPreviewObject)
    //     // console.log(spotPreview[0].toJSON().url)
    //     // console.log(spotPreview[0].toJSON().preview)
    //     // for (let j = 0; j < spotPreview.length; j++)

    //     // let previewImageURL = spotPreview[0].dataValues.url
    //     // let previewImageTruthiness = spotPreview[0].dataValues.preview
    //     // let previewImageURL = spotPreview[0].toJSON().url
    //     // let previewImageTruthiness = spotPreview[0].toJSON().preview

    //     // console.log(previewImageURL)

    //     if (previewImageURL && previewImageTruthiness) {
    //         bookingSpot.previewImage = previewImageURL
    //     } else {
    //         bookingSpot.previewImage = "No preview available."
    //     }
    // }

    // //still need previewImage for Spot
    // res.status(200).json({Bookings: currentUserBookingsObject})

    // console.log(currentUserBookings)


    const bookingsObj = []
    const payload = {}

for (let booking of currentUserBookings) {


        const jsonConversion = booking.toJSON();
            // console.log(jsonConversion)
        let nestedSpotSpotImages = jsonConversion.Spot.SpotImages
            // console.log(nestedSpotSpotImages)
        if (nestedSpotSpotImages.length) {

         for (const book of nestedSpotSpotImages) {
            if (book.preview) jsonConversion.Spot.previewImage = book.url

            }
        }

        if (!jsonConversion.Spot.previewImage) jsonConversion.Spot.previewImage = "Preview image not available"
        // console.log(jsonConversion.Spot.previewImage)



        
        let cSpot = jsonConversion.Spot   //put spotObj in payload
        payload.Spot = cSpot

        //try a payload this time
        let cId = jsonConversion.id   //rest of these are the spotInfo
        let cSpotId = jsonConversion.spotId
        let cUserId = jsonConversion.userId
        let cStartDate = jsonConversion.startDate
        let cEndDate = jsonConversion.endDate
        let cCreateAt = jsonConversion.createdAt
        let cUpdatedAt = jsonConversion.updatedAt



        payload.id = cId

        payload.spotId = cSpotId

        payload.userId = cUserId

        payload.startDate = cStartDate

        payload.endDate = cEndDate

        payload.createdAt = cCreateAt

        payload.updatedAt = cUpdatedAt


        delete jsonConversion.Spot.SpotImages

    }

    bookingsObj.push(payload)


    return res.json(
        {
        Bookings: bookingsObj
    }
)


})

//STILL NEED TO DO "past bookings can't be modified"
//booking conflicts date refactor
router.put('/:bookingId', restoreUser, requireAuth, validateEditBooking, async (req, res) => {
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

    if(bookingToFind.userId !== req.user.id){
        return res.status(403).json({
            message: "Booking must belong to the current user",
            statusCode: 403
        })
    }

    const spotIdValFromFoundBooking = bookingToFind.toJSON().spotId
    const bookingConflictDates = await Booking.findAll({
        where: {
            spotId: spotIdValFromFoundBooking
            //could be id
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
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    const bookingToDeleteId = bookingToDelete.toJSON().spotId
    const bookingOwnerIdQuery = await Spot.findOne({
        where: {
            id: bookingToDeleteId
        }
    })
    const spotOwnerIdCheck = bookingOwnerIdQuery.toJSON().ownerId

    if (!req.params.bookingId) {
            return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    console.log(bookingToDelete)


    if (bookingToDelete.userId !== req.user.id) {
        // throw new Error('Invalid')
       return res.status(403).json({
        "message": "Forbidden",
        "statusCode": 403
      })
    }

    if (req.user.id !== spotOwnerIdCheck) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }

    const startedBookingCheck = bookingToDelete.toJSON().startDate
    // console.log(new Date(startedBookingCheck))
    // console.log(new Date())
    if (new Date(startedBookingCheck) <= new Date()) {
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    }

    // if (new Date(startedBookingCheck) < new Date()) {
    //     return res.status(403).json({
    //         "message": "Bookings that have passed can't be deleted",
    //         "statusCode": 403
    //       })
    // }

    await bookingToDelete.destroy()

    res.status(200)
   return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})

module.exports = router
