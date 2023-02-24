const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, sequelize } = require('../../db/models');

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

router.post('/:spotId/images', restoreUser, async (req, res) => {
        const pk = req.params.spotId
        const getSpotPk = await Spot.findByPk(pk)

        // console.log(req.user)
        console.log(getSpotPk)
        // if (!getSpotPk || req.user.id !== getSpotPk.ownerId) {
        //     res.status(404).json({
        //         "message": "Spot couldn't be found",
        //         "statusCode": 404
        //       })
        // }
        if (!getSpotPk || req.user.id !== getSpotPk.ownerId || req.user.id !== pk) {
            res.status(404).json({
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
            res.status(400).json(error)
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


    res.json(spotDetails)
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotToDelete = await Spot.findByPk(req.params.spotId)

    if (!spotToDelete) {
        res.status(404)
        res.json({
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




module.exports = router
