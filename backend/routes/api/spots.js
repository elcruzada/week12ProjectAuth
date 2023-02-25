const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
// const Sequelize = require("sequelize")

router.get('/', async (req, res) => {
    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    page = parseInt(page)
    size = parseInt(size)

    if (!page) page = 1
    if (!size) size = 20







    let pagination = {}

    if (page && size) {
    pagination.limit = size
    pagination.offset = (page - 1) * size
    }

    let result = {}



    // const Spots = await Spot.findAll()

    // const Rating = await Review.findAll({
    //     attributes: ['spotId', 'stars']
    // })

    const spotsWithReviewImage = await Spot.findAll({
        include:[
            // {
            //     model: Review
            // },
            {
                model: SpotImage
            }
        ],

    })

    const spotsObjects = []
    for (let i = 0; i < spotsWithReviewImage.length; i++) {
            const spot = spotsWithReviewImage[i]
            spotsObjects.push(spot.toJSON())
    }

    // console.log(spotsObjects)

    for (let j = 0; j < spotsObjects.length; j++) {
        const spot = spotsObjects[j]
        // console.log(spot.SpotImages)
        if (spot.SpotImages.length > 0) {
            for (let k = 0; k < spot.SpotImages.length; k++) {
                const image = spot.SpotImages[k]
                // console.log(image.preview)
                console.log(spot)
                if (image.preview === true) {
                    spot.previewImage = image.url
                }

                if (!image.preview) {
                    spot.previewImage = "No preview for this image"
                }
            }
        }
        delete spot.SpotImages

        //aggregate data
        let reviewStars = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
            // {
                // include: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                // ]
            // }
            ]
        })
        // console.log(reviewStars.toJSON())
        let starAVG = reviewStars.toJSON().avgRating

        if (starAVG) {
            spot.avgRating = starAVG
        } else {
            spot.avgRating = 'No stars yet'
        }
    }


    // let errorObj = {
    //     "message": "Validation Error",
    //     "statusCode": 400,
    //     "errors": {}
    // }

    // if (!maxLat) maxLat = 180
    // if (!minLat) minLat = -180
    // if (!minLng) minLng = -180
    // if (!maxLng) maxLng = 180
    // if (!minPrice) minPrice = 0
    // if (!maxPrice) maxPrice = 1337133713371337

    // if (page < 1) errorObj.errors.page = "Page must be greater than or equal to 1"
    // if (size > 20) errorObj.errors.size = "Size must be greater than or equal to 1"
    // if (maxLat > 180) errorObj.errors.maxLat = "Maximum latitude is invalid"
    // if (minLat < -180) errorObj.errors.minLat = "Minimum latitude is invalid"
    // if (minLng < -180) errorObj.errors.minLng = "Maximum longitude is invalid"
    // if (maxLng > 180) errorObj.errors.maxLng = "Minimum longitude is invalid"
    // if (minPrice < 0) errorObj.errors.minPrice = "Maximum price must be greater than or equal to 0"
    // if (maxPrice > 1337133713371337) errorObj.errors.maxPrice = "Minimum price must be greater than or equal to 0"

    // if (!page || !size || maxLat > 180 || minLat < -180 || minLng < 180
    //     || maxLng > 180 || minPrice < 0 || maxPrice > 1337133713371337) {
    //         return res.status(400).json(errorObj)
    //     }


    result.Spots = spotsObjects
    result.page = page
    result.size = size

    res.status(200).json(result)
    // let total = 0


    // for (let i = 0; i < Rating.length; i++) {
    //     let rating = Rating[i].spotId
    //     for (let j = 0; j < Spots.length; j++) {
    //         let spot = Spots[j]
    //         // console.log(spot.id)
    //         if (rating === spot.id) {

    //         }
    //     }
    // }


    // res.json(Rating)
    // res.json(Spots[1].id)
    // return res.json(Rating[0].spotId)
    // res.status(200).json({
    //     Spots,
    //     // Rating
    // })
})


router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price} = req.body
    const ownerId = req.user.id

    const createdSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    let error = {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {}
    }

    if (!address) error.errors.address = "Street address is required"
    if (!city) error.errors.city = "City is required"
    if (!state) error.errors.state = "State is required"
    if (!country) error.errors.country = "Country is required"
    if (!lat) error.errors.lat = "Latitude is not valid"
    if (!lng) error.errors.lng = "Longitude is not valid"
    if (!name) error.errors.name = "Name must be less than 50 characters"
    if (!description) error.errors.description = "Description is required"
    if (!price) error.errors.price = "Price per day is required"

    if (!address || !city || !state || !country
        || !lat || !lng || !name || !description || !price) {
            res.status(400).json(error)
        }

    res.status(201).json(createdSpot)

})

router.post('/:spotId/images', [restoreUser, requireAuth], async (req, res) => {
        const pk = req.params.spotId
        const getSpotPk = await Spot.findByPk(pk)

        // console.log(req.user)
        // console.log(getSpotPk)
        // if (!getSpotPk || req.user.id !== getSpotPk.ownerId) {
        //     res.status(404).json({
        //         "message": "Spot couldn't be found",
        //         "statusCode": 404
        //       })
        // }
        if (!getSpotPk || req.user.id !== getSpotPk.ownerId) {
           return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
              })
        }

        let newSpotImage = await SpotImage.create({
            "spotId": pk,
            "url": "image url",
            "preview": true
        })

        let result = {
            id: newSpotImage.id,
            url: newSpotImage.url,
            preview: newSpotImage.preview
        }
        // console.log(result)
        res.status(200).json(result)
})

router.get('/current', restoreUser, async (req, res) => {
    const currentUserId = req.user.id



    const currentUserSpots = await Spot.findAll({
        where: {
            ownerId: currentUserId
        }
    })

    const spotsWithReviewImage = await Spot.findAll({
        where: {
            ownerId: currentUserId
        },
        include:[
            // {
            //     model: Review
            // },
            {
                model: SpotImage
            }
        ],

    })

    const spotsObjects = []
    for (let i = 0; i < spotsWithReviewImage.length; i++) {
            const spot = spotsWithReviewImage[i]
            spotsObjects.push(spot.toJSON())
    }

    // console.log(spotsObjects)

    for (let j = 0; j < spotsObjects.length; j++) {
        const spot = spotsObjects[j]
        // console.log(spot.SpotImages)
        if (spot.SpotImages.length > 0) {
            for (let k = 0; k < spot.SpotImages.length; k++) {
                const image = spot.SpotImages[k]
                // console.log(image.preview)
                console.log(spot)
                if (image.preview === true) {
                    spot.previewImage = image.url
                }

                if (!image.preview) {
                    spot.previewImage = "No preview for this image"
                }
            }
        }
        delete spot.SpotImages

        //aggregate data
        let reviewStars = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
            // {
                // include: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                // ]
            // }
            ]
        })
        // console.log(reviewStars.toJSON())
        let starAVG = reviewStars.toJSON().avgRating

        if (starAVG) {
            spot.avgRating = starAVG
        } else {
            spot.avgRating = 'No stars yet'
        }
    }
//   const {user} = req.body
//   if (user) {

//   }

    res.json(spotsObjects)
})



router.get('/:spotId', async (req, res) => {
    const spotIdVar = req.params.spotId
    const spotDetails = await Spot.findByPk(
        spotIdVar, {
        include: {
            model: SpotImage
        }
})

if (!spotDetails) {
    res.status(404).json({
        "message": "Spot couldn't be found",
        "statusCode": 404
    })
}

// console.log(spotDetails.SpotImages.length)

// const spotArray = []
// spotArray.push(spotDetails)
// console.log(spotArray[0].SpotImages)

// if (spotDetails.SpotImages.length) {
//     const spotsObjects = []
//     for (let i = 0; i < spotDetails.length; i++) {
//         let spot = spotDetails[i]
//         spotsObjects.push(spot)
//     }
//     console.log(spotsObjects)
// }

            // spotsObjects.push(spotDetails.toJSON())

    // // console.log(spotsObjects)

    // for (let j = 0; j < spotsObjects.length; j++) {
    //     const spot = spotsObjects[j]
        // console.log(spot.SpotImages)
        // if (spotDetails.SpotImages.length > 0) {
        //     for (let k = 0; k < spotDetails.SpotImages.length; k++) {
        //         const image = spotDetails.SpotImages[k]
        //         // console.log(image.preview)
        //         // console.log(spot)
        //         if (image.preview === true) {
        //             spotDetails.previewImage = image.url
        //         }

        //         if (!image.preview) {
        //             spotDetails.previewImage = "No preview for this image"
        //         }
        //     }
        // }

        // spotDetails.numReviews = spotDetails.SpotImages.length

        // let reviewStars = await Review.findOne({
        //     where: {
        //         spotId: spotDetails.id
        //     },
        //     attributes: [
        //     // {
        //         // include: [
        //             [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        //         // ]
        //     // }
        //     ]
        // })
        // // console.log(reviewStars.toJSON())
        // let starAVG = reviewStars.toJSON().avgRating

        // if (starAVG) {
        //     spotDetails.avgStarRating = starAVG
        // } else {
        //     spotDetails.avgStarRating = 'No stars yet'
        // }
        // delete spotArray[0].SpotImages

        //aggregate data

        const spotAndId = await Spot.findAll({
            where: {
                id: spotIdVar
            },
            include: [
                {
                    model: Review,
                    attributes: ['stars']
                },
                {
                model: SpotImage
                }
            ]
        })



    // console.log(spotDetails)

    // const ownerDetails = await spotDetails.getUser()

    //     console.log(ownerDetails)

    // res.json(spotArray[0])
    // res.json(ownerDetails)
    res.json(spotAndId)
})

router.put('/:spotId', [requireAuth, restoreUser], async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body



    let pk = req.params.spotId

    let spotDetails = await Spot.findByPk(pk)
    if (!spotDetails) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    console.log(spotDetails)
    // if (gameName) {
    //     gameToUpdate.set({
    //         gameName
    //     })
    // }
    // if (maxPlayers) {
    //     gameToUpdate.set({
    //         maxPlayers
    //     })
    // }
    let error = {
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {}
      }

    if (!address) error.errors.address = "Street address is required"
    if (!city) error.errors.city = "City is required"
    if (!state) error.errors.state = "State is required"
    if (!country) error.errors.country = "Country is required"
    if (!lat) error.errors.lat = "Latitude is not valid"
    if (!lng) error.errors.lng = "Longitude is not valid"
    if (!name) error.errors.name = "Name must be less than 50 characters"
    if (!description) error.errors.description = "Description is required"
    if (!price) error.errors.price = "Price per day is required"

    if (!address || !city || !state || !country
        || !lat || !lng || !name || !description || !price) {
           return res.status(400).json(error)
        }

    if (address) spotDetails.address = address
    if (city) spotDetails.city = city
    if (state) spotDetails.state = state
    if (country) spotDetails.country = country
    if (lat) spotDetails.lat = lat
    if (lng) spotDetails.lng = lng
    if (name) spotDetails.name = name
    if (description) spotDetails.description = description
    if (price) spotDetails.price = price

    await spotDetails.save()


    res.status(200).json(spotDetails)
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotToDelete = await Spot.findByPk(req.params.spotId)

    if (!spotToDelete) {
        res.status(404)
       return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (spotToDelete.ownerId !== req.user.id) {
        throw new Error('Invalid')
    }

    await spotToDelete.destroy()

    res.status(200)
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { id, review, stars } = req.body

    let desiredSpotId = req.params.spotId
    let userId = req.user.id

    const createReviewValidationError = {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {}
    }

    if (!review) {
        createReviewValidationError.errors.review = "Review text is required"
    }

    if (!stars || parseInt(stars) < 1 || parseInt(stars) > 5) {
        createReviewValidationError.errors.stars = "Stars must be an integer from 1 to 5"
    }

    if (!review || !stars) {
      return  res.status(400).json(createReviewValidationError)
    }

    const specificSpot = await Spot.findOne({
        where: {
            id: desiredSpotId
        }
    })

    // console.log(specificSpot.id)
    if (!specificSpot) {
       return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }



    const existingUser = await Review.findOne({
        where: {
            userId: req.user.id
        }
    })

    if (existingUser) {
      return  res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
          })
    }

    const createdReview = await Review.create({
        id,
        "userId": userId,
        "spotId": specificSpot.id,
        "review": review,
        "stars": stars
    })
    // console.log(spotReviews)

    // let newSpotImage = await spotReviews.create({
    //     id,
    //     "userId": userId,
    //     "spotId": specificSpot.id,
    //     "review": review,
    //     "stars": stars,
    // })

    // let reviewResult = {
    //     id,
    //     "userId": userId,
    //     "spotId": specificSpot.id,
    //     "review": review,
    //     "stars": stars
    // }



    res.status(201).json(createdReview)
})


router.get('/:spotId/reviews', async (req, res) => {

    const findSpotId = await Spot.findByPk(req.params.spotId)

    if (!findSpotId) {
       return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    const allSpotReviews = await Review.findAll({
        where: {
            userId:
            req.user.id
        },
        include: [
                    {
                    model: User,
                    attributes:
                    {
                        exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                    }
                    },
                    {
                        model: ReviewImage,
                        attributes: {
                            exclude: ['reviewId', 'createdAt', 'updatedAt']
                        }
                    }
                ]
    })

    res.status(200).json(allSpotReviews)
})

//come back to this route after create booking
router.get('/:spotId/bookings', [requireAuth, restoreUser], async (req, res) => {
    let spotIdForBooking = req.params.spotId
    let currentUserId = req.user.id

    const getSpotCurrentUserId = await Spot.findByPk(spotIdForBooking)

    if (!getSpotCurrentUserId) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    // console.log(getSpotCurrentUserId.dataValues.ownerId)

    const getAllBookingsForUnauthorizedUser = await Booking.findAll({
        where: {
            spotId: spotIdForBooking
        },
        attributes: {
            exclude: ['id', 'createdAt', 'updatedAt', 'userId']
        }
    })

    if (currentUserId !== getSpotCurrentUserId.dataValues.ownerId){

        res.status(200).json({Bookings: getAllBookingsForUnauthorizedUser})
    }

    // const currentSpotBookings = await Booking.findAll({
    //     where: {
    //         spotId: getSpotCurrentUserId.id
    //     }
    // })

    // const currentSpotBookingsArray = []
    // for (let i = 0; i < currentSpotBookings.length; i++) {
    //     const booking = currentSpotBookings[i]
    //     currentSpotBookingsArray.push(booking.toJSON())
    // }
    // // console.log(currentSpotBookingsArray)

    // for (let i = 0; i < currentSpotBookingsArray.length; i++) {
    //     let booking = currentSpotBookingsArray[i]

    // }
    const getBookingsForUser = await Booking.findAll({
        where: {
            userId: spotIdForBooking
        },
        include: {
            model: User,
            attributes: {
                exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
            }
        }
    })
    // res.status(200).json(getBookingsForUser)
    // console.log(currentSpotBookings)

    if (currentUserId === getSpotCurrentUserId.dataValues.ownerId){
        res.status(200).json({Bookings:getBookingsForUser})
    }
})

router.post(':/spotId/bookings', [requireAuth, restoreUser], async (req, res) => {
    const { startDate, endDate } = req.body
    let currentUser = req.user.id

    // const newBookingBySpotId = 
})

module.exports = router
