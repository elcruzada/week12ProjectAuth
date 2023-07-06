const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const { Op } = require('sequelize')
// const Sequelize = require("sequelize")


const spotsValidatorForQuery = [
    check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Size must be greater than or equal to 1'),
    check("maxLat")
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Minimum latitude is invalid'),
    check("maxLng")
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage('Maximum longitude is invalid'),
    check('minLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage('Minimum longitude is invalid'),
    check('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
    check("minPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    handleValidationErrors
];


router.get('/', spotsValidatorForQuery, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query


    let where = {}
    let pagination = {}
    let result = {}


    page = parseInt(page)
    size = parseInt(size)

    if (!page) page = 1
    if (page > 10) page = 1
    if (!size) size = 20
    if (size > 10) size = 20



    if (page && size) {
        pagination.limit = size
        pagination.offset = (page - 1) * size
    }


    //longitude
    if (!minLng && maxLng) {
        where.lng = {
            [Op.lte]: minLng
        }
    }

    if (minLng && !maxLng) {
        where.lng = {
            [Op.gte]: maxLng
        }
    }

    if (minLng && maxLng) {
        where.lng = {
            [Op.and]: {
                [Op.gte]: minLng,
                [Op.lte]: maxLng
            }
        }
    }


    //latitude
    if (minLat && !maxLat) {
        where.lat = {
            [Op.gte]: minLat
        }
    }

    if (!minLat && maxLat) {
        where.lat = {
            [Op.lte]: maxLat
        }
    }

    if (minLat && maxLat) {
        where.lat = {
            [Op.and]: {
                [Op.gte]: minLat,
                [Op.lte]: maxLat
            }
        }
    }


    //price
    if (minPrice && !maxPrice) {
        where.price = {
            [Op.gte]: minPrice
        }
    }


    if (!minPrice && maxPrice) {
        where.price = {
            [Op.lte]: maxPrice
        }
    }

    if (minPrice && maxPrice) {
        where.price = {
            [Op.and]: {
                [Op.gte]: minLng,
                [Op.lte]: maxLng
            }
        }
    }
    // console.log(where)
    // const Spots = await Spot.findAll()

    // const Rating = await Review.findAll({
    //     attributes: ['spotId', 'stars']
    // })

    const spotsWithReviewImage = await Spot.findAll({
        where,
        include: [
            // {
            //     model: Review
            // },
            {
                model: SpotImage,
                attributes: ['url', 'preview']
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
        // console.log(spot)
        // if (spot.SpotImages.length > 0) {
        for (let k = 0; k < spot.SpotImages.length; k++) {
            const image = spot.SpotImages[k]
            console.log(image)
            // console.log(spot)
            if (image.preview === true) {
                spot.previewImage = image.url
            }

            // else {
            // console.log(spot.previewImage)
            // }
            // if (!image.preview) {
            //     spot.previewImage = "No preview for this image"
            // }
        }
        // }
        if (!spot.previewImage) spot.previewImage = "No preview for this image"
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
        // console.log(Number(reviewStars.toJSON().avgRating).toFixed(1))
        // console.log(reviewStars.toJSON())
        let starAVG = reviewStars.toJSON().avgRating
        let starAVGVal = Number(reviewStars.toJSON().avgRating).toFixed(1)

        if (starAVG) {
            spot.avgRating = starAVGVal
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
    // if (minLng < -90) errorObj.errors.minLng = "Maximum longitude is invalid"
    // if (maxLng > 90) errorObj.errors.maxLng = "Minimum longitude is invalid"
    // if (minPrice < 0) errorObj.errors.minPrice = "Maximum price must be greater than or equal to 0"
    // if (maxPrice > 1337133713371337) errorObj.errors.maxPrice = "Minimum price must be greater than or equal to 0"

    // if (!page || !size || maxLat > 180 || minLat < -180 || minLng < 180
    //     || maxLng > 180 || minPrice < 0 || maxPrice > 1337133713371337) {
    //         return res.status(400).json(errorObj)
    //     }


    result.Spots = spotsObjects
    result.page = page
    result.size = size

    return res.status(200).json(result)
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
    const { address, city, state, country, lat, lng, name, description, price } = req.body
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

    // for (let i = 0; i < name)
    console.log(name.length)

    if (!address) error.errors.address = "Street address is required"
    if (!city) error.errors.city = "City is required"
    if (!state) error.errors.state = "State is required"
    if (!country) error.errors.country = "Country is required"
    if (!lat) error.errors.lat = "Latitude is not valid"
    if (!lng) error.errors.lng = "Longitude is not valid"
    if (!name) error.errors.name = "Name is required"
    if (name.length >= 50) error.errors.name = "Name must be less than 50 characters"
    if (!description) error.errors.description = "Description is required"
    if (!price) error.errors.price = "Price per day is required"

    if (!address || !city || !state || !country
        || !lat || !lng || !name || name.length >= 50 || !description || !price) {
        res.status(400).json(error)
    }

    res.status(201).json(createdSpot)

})

router.post('/:spotId/images', [restoreUser, requireAuth], async (req, res) => {
    const { url } = req.body
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
        "url": url,
        "preview": true
    })

    let result = {
        id: newSpotImage.id,
        url: newSpotImage.url,
        preview: newSpotImage.preview
    }
    // console.log(result)
    return res.status(200).json(result)
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
            ownerId: currentUserId,
        },
        include: [
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
                // console.log(spot)
                if (image.preview === true) {
                    spot.previewImage = image.url
                }

                // if (!image.preview) {
                //     spot.previewImage = "No preview for this image"
                // }
            }
        }
        if (!spot.previewImage) spot.previewImage = "No preview for this image"
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
        let starAVG = Number(reviewStars.toJSON().avgRating).toFixed(1)

        if (starAVG) {
            spot.avgRating = starAVG
        } else {
            spot.avgRating = 'No stars yet'
        }
    }
    //   const {user} = req.body
    //   if (user) {

    //   }

    res.json({ Spots: spotsObjects })
})



// router.get('/:spotId', async (req, res) => {
//     const spotIdVar = req.params.spotId
//     const spotDetails = await Spot.findByPk(
//         spotIdVar, {
//         include: {
//             model: SpotImage
//         }
// })

// if (!spotDetails) {
//     res.status(404).json({
//         "message": "Spot couldn't be found",
//         "statusCode": 404
//     })
// }

//         const spotAndId = await Spot.findOne({
//             where: {
//                 id: spotIdVar
//             },
//             include: [
//                 {
//                     model: Review,
//                     attributes: ['stars']
//                 },
//                 {
//                 model: SpotImage,
//                 attributes: {
//                     exclude: ['createdAt', 'updatedAt', 'spotId']
//                 }
//                 }
//             ]
//         })

//         const spotReviews = spotAndId.dataValues.Reviews
//         // console.log(spotReviews)
//         let numReviewValue = spotReviews.length
//         let avgStarRatingValue = 0

//         for (let i = 0; i < spotReviews.length; i++) {
//             let reviewStarsValue = spotReviews[i].dataValues.stars
//             // console.log(reviewStarsValue)
//             avgStarRatingValue += reviewStarsValue
//         }

//         avgStarRatingValue = avgStarRatingValue / spotReviews.length
//         // console.log(numReviewValue)

//         // console.log(avgStarRatingValue)
//         const user = await User.findOne({
//             where: {
//                 id: req.params.spotId
//             },
//             attributes: {
//             exclude: ['username']
//             }
//         })

//         // console.log(user)
//         // console.log(spotAndId.Reviews)
//         // console.log(spotAndId)
//         // spotAndId.dataValues.Owner = {}
//         delete spotAndId.dataValues.Reviews
//         spotAndId.dataValues.numReviews = numReviewValue
//         spotAndId.dataValues.avgStarRating = avgStarRatingValue.toFixed(1)
//         spotAndId.dataValues.Owner = user.dataValues


//         await spotAndId.save()

//     // console.log(spotDetails)

//     // const ownerDetails = await spotDetails.getUser()

//     //     console.log(ownerDetails)

//     // res.json(spotArray[0])
//     // res.json(ownerDetails)
//     res.status(200).json(spotAndId)
router.get('/:spotId', async (req, res) => {
    const spotIdVar = req.params.spotId;

    try {
        const spot = await Spot.findOne({
            where: { id: spotIdVar },
            include: [
                { model: Review, attributes: ['stars'] },
                { model: SpotImage, attributes: { exclude: ['createdAt', 'updatedAt', 'spotId'] } },
                { model: User, attributes: { exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt'], as: 'Owner' } }
            ]
        });

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
        }

        const numReviews = spot.Reviews.length;
        const avgStarRating = (numReviews > 0) ? spot.Reviews.reduce((total, review) => total + review.stars, 0) / numReviews : 0;
        spot.setDataValue('numReviews', numReviews);
        spot.setDataValue('avgStarRating', avgStarRating.toFixed(1));

        const spotObject = spot.toJSON();
        spotObject.Owner = spotObject.User;
        delete spotObject.User;

        res.status(200).json(spotObject);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error occurred',
            statusCode: 500
        });
    }
});
// router.get('/:spotId', async (req, res) => {
//     const spotIdVar = req.params.spotId;

//     try {
//       const spot = await Spot.findOne({
//         where: { id: spotIdVar },
//         include: [
//           { model: Review, attributes: ['stars'] },
//           { model: SpotImage, attributes: { exclude: ['createdAt', 'updatedAt', 'spotId'] } },
//           { model: User, attributes: { exclude: ['username'] } }
//         ]
//       });

//       if (!spot) {
//         return res.status(404).json({
//           message: "Spot couldn't be found",
//           statusCode: 404
//         });
//       }

//       const numReviews = spot.Reviews.length;
//       const avgStarRating = (numReviews > 0) ? spot.Reviews.reduce((total, review) => total + review.stars, 0) / numReviews : 0;
//       spot.setDataValue('numReviews', numReviews);
//       spot.setDataValue('avgStarRating', avgStarRating.toFixed(1));

//       res.status(200).json(spot);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         message: 'Server error occurred',
//         statusCode: 500
//       });
//     }
//   });
router.get('/:spotId', async (req, res) => {
    const spotIdVar = req.params.spotId;

    try {
        const spot = await Spot.findOne({
            where: { id: spotIdVar },
            include: [
                {
                    model: Review,
                    attributes: ['stars'],
                },
                {
                    model: SpotImage,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'spotId']
                    }
                },
                {
                    model: User,
                    attributes: {
                        exclude: ['username'],
                        include: [
                            {
                                model: Owner,
                                attributes: { exclude: ['createdAt', 'updatedAt'] }
                            }
                        ]
                    }
                }
            ]
        });

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
        }

        const numReviews = spot.Reviews.length;
        const avgStarRating = (numReviews > 0) ? spot.Reviews.reduce((total, review) => total + review.stars, 0) / numReviews : 0;
        spot.setDataValue('numReviews', numReviews);
        spot.setDataValue('avgStarRating', avgStarRating.toFixed(1));
        spot.User = spot.User.Owner;

        res.status(200).json(spot);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error occurred',
            statusCode: 500
        });
    }
});



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
    // console.log(spotDetails)
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
    if (!name) error.errors.name = "No name provided"
    if (name.length >= 50) error.errors.name = "Name must be less than 50 characters"
    if (!description) error.errors.description = "Description is required"
    if (!price) error.errors.price = "Price per day is required"

    if (!address || !city || !state || !country
        || !lat || !lng || !name || name.length >= 50 || !description || !price) {
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


    return res.status(200).json(spotDetails)
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
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    await spotToDelete.destroy()

    res.status(200)
    return res.json({
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
        return res.status(400).json(createReviewValidationError)
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


    let { spotId } = req.params
    const existingUser = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId
        }
    })
    //querying for current user's reviews
    //also need logic for
    //current spot is req.params.spotId
    // console.log(existingUser)

    if (existingUser) {
        return res.status(403).json({
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



    return res.status(201).json(createdReview)
})


//figure out the where
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
            spotId: req.params.spotId
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
                //     // where: {
                //     //     id: reviewId
                //     // }
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt']
                }
            }
        ]
    })

    for (let i = 0; i < allSpotReviews.length; i++) {
        let spotReview = allSpotReviews[i]
        // console.log(spotReview)

        const allReviewImagesOfSpot = await ReviewImage.findAll({
            where: {
                reviewId: spotReview.id
            },
            attributes: {
                exclude: ['reviewId', 'createdAt', 'updatedAt']
            }
        })


        // for (let reviewImage of allReviewImagesOfSpot) {

        // }

    }




    // console.log(allSpotReviews[0].dataValues.ReviewImages)

    res.status(200).json({ Reviews: allSpotReviews })
})


//need to do booking date conflict error for this
router.post('/:spotId/bookings', [requireAuth, restoreUser], async (req, res) => {
    const { startDate, endDate } = req.body
    let currentUser = req.user.id
    let currentSpotId = req.params.spotId

    if (endDate <= startDate) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    const getSpotId = await Spot.findByPk(currentSpotId)

    if (!getSpotId) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const bookingConflictDates = await Booking.findAll({
        where: {
            spotId: currentSpotId
        }
    })

    console.log(bookingConflictDates)
    const convertedConflicts = []

    for (let i = 0; i < bookingConflictDates.length; i++) {
        let conflict = bookingConflictDates[i]
        // console.log(conflict)
        convertedConflicts.push(conflict.toJSON())
    }

    //key into startDate and endDate
    for (let j = 0; j < convertedConflicts.length; j++) {
        let conflict = convertedConflicts[j]
        // console.log(bookingToFind.id)
        const conflictingStartDate = new Date(conflict.startDate).getTime()
        const conflictingEndDate = new Date(conflict.endDate).getTime()
        const convertedStartDate = new Date(startDate).getTime()
        const convertedEndDate = new Date(endDate).getTime()
        if ((convertedStartDate >= conflictingStartDate && convertedStartDate <= conflictingEndDate) ||
            (convertedEndDate >= conflictingStartDate && convertedEndDate <= conflictingEndDate) ||
            (convertedStartDate <= conflictingStartDate && convertedEndDate >= conflictingEndDate)) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403
            });
        }
        // console.log(new Date(conflict.startDate).getTime())

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

    // const bookingConflictDates = await Booking.findAll({
    //     where: {
    //         spotId: currentSpotId
    //     }
    // })

    // console.log(bookingConflictDates)

    // const bookingErrorObj = {
    //     "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {}
    // }


    // const bookingsConflictDates = await Booking.findAll({
    //     where: {
    //       spotId: currentSpotId,
    //       startDate: {
    //         [Op.lte]: endDate
    //         },
    //     }
    //   });

    //   const bookingsConflictDates2 = await Booking.findAll({
    //     where: {
    //       spotId: currentSpotId,
    //       endDate: {
    //         [Op.gte]: startDate
    //         }
    //       }

    //   });

    // //   console.log(bookingsConflictDates)
    // if (bookingsConflictDates.length){

    //         bookingErrorObj.errors.startDate = "Start date conflicts with an existing booking"
    //     }

    //     if (bookingsConflictDates2.length){

    //         bookingErrorObj.errors.endDate = "End date conflicts with an existing booking"
    //         // res.status(403).json(bookingErrorObj)
    //     }
    //  if (bookingsConflictDates.length || bookingsConflictDates2.length)  return res.status(403).json(bookingErrorObj)


    // if (bookingsConflictDates.length){
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
    // const bookingConflictDatesArray = []
    // for (let i = 0; i < bookingConflictDates[0].length; i++) {
    //         let booking = bookingConflictDates[0][i].dataValues
    //         bookingConflictDatesArray.push(booking.toJSON())
    // }


    // console.log(bookingConflictDates)
    // for (let j = 0; j < bookingConflictDatesArray.length; j++) {
    //     let booking = bookingConflictDatesArray[j].startDate
    //     console.log(booking)
    // }

    const foundSpotId = getSpotId.dataValues.id

    // console.log(foundSpotId)


    const createNewBookingBySpotId = await Booking.create({
        "spotId": foundSpotId,
        "userId": currentUser,
        "startDate": startDate,
        "endDate": endDate
    })



    return res.json(createNewBookingBySpotId)
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

    if (currentUserId !== getSpotCurrentUserId.dataValues.ownerId) {

        return res.status(200).json(
            {
                Bookings: getAllBookingsForUnauthorizedUser
            }
        )
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

    if (currentUserId === getSpotCurrentUserId.dataValues.ownerId) {
        return res.status(200).json(
            {
                Bookings: getBookingsForUser
            }
        )
    }
})



module.exports = router
