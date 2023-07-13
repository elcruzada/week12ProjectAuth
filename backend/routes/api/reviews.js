const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const review = require('../../db/models/review')


//THIS IS BREAKING YOU MUST FIX TODAY
router.get('/current',[restoreUser, requireAuth], async (req, res) => {

    const currentUserReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model:User,
                attributes: {
                    exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']
                }
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url', 'preview']
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    // console.log(currentUserReviews)

    const reviewsConverted = []
    for (let i = 0; i < currentUserReviews.length; i++) {
        let review = currentUserReviews[i].toJSON()
        reviewsConverted.push(review)
    }

    // console.log(reviewsArray)

    for (let j = 0; j < reviewsConverted.length; j++) {
        let review = reviewsConverted[j]
        let reviewC = reviewsConverted[j].Spot.SpotImages
        // console.log(reviewC)
        if (reviewC.length) {
            if (reviewC[0].preview) {
                console.log(review)
                reviewsConverted[j].Spot.previewImage = reviewsConverted[j].Spot.SpotImages[0].url
            }
        }

        let reviewCheck = review.ReviewImages
        // console.log(reviewCheck)
        let falsySpotCheck = review.Spot.previewImage

        if (!reviewCheck) review.ReviewImage = "Review images unavailable"
        if (!falsySpotCheck) review.Spot.previewImage = "Preview unavailable"
        delete review.Spot.SpotImages

    }



    //if I want to go back to the payload way, comment out everything
    //but the where
    // let payload = []

    // for (let review of currentUserReviews) {
    //     let pojo = {}

    //     const reviewSpot = await Spot.findOne({
    //         where: {
    //             id: review.spotId,
    //         },
    //         attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
    //     })

    //     for (let key in review.dataValues) {
    //         pojo[key] = review[key]
    //     }

    //     let spotImageVal = await SpotImage.findOne({
    //         where: {
    //             spotId: reviewSpot.id
    //         }
    //     })

    //     const spotPayload = {}

    //     for (let key in reviewSpot.dataValues) {
    //         spotPayload[key] = reviewSpot[key]
    //     }

    //     let spotImageArray = []
    //     let jsonImageVal = spotImageVal.toJSON()
    //     spotImageArray.push(jsonImageVal)
    //     // console.log(spotImageArray)
    //     // console.log(spotImageVal.toJSON().url)
    //     // let spotImageJSON = spotImageVal.toJSON().url

    //     if (spotImageArray[0].preview) {    //need this conditional
    //         spotPayload.previewImage = spotImageArray[0].url
    //     } else {
    //         spotPayload.previewImage = "Image is unavailable"
    //     }

    //     const reviewImagePayload = {}

    //     const reviewImageQuery = await ReviewImage.findAll({
    //         where: {
    //             reviewId: review.id
    //         },
    //         attributes: ['id', 'url']
    //     })

    //     pojo.ReviewImages = reviewImageQuery

    //     pojo.Spot = spotPayload
    //     payload.push(pojo)
    // }
    // console.log(currentUserReviews)
    // for (let i = 0; i < currentUserReviews.length; i++) {
    //         let review = currentUserReviews[i]
    //         console.log(review)
    //         const reviewImages = await ReviewImage.findAll({
    //             // where: {
    //             where: {
    //                 reviewId: review.dataValues.id
    //             },
    //             attributes: ['id', 'url']


    //         })

            // for (let reviewImage of reviewImages) {
            //     delete reviewImage.reviewId
            //     delete reviewImage.createdAt
            //     delete reviewImage.updatedAt
            // }

    // }


    //need to put review images there
    // const reviewImageArray = []
    // for (let i = 0; i < reviewImages.length; i++) {
    //     let review = reviewImages[i].dataValues
    //     // console.log(review)
    //     reviewImageArray.push(review)
    //     // if (ReviewImage)
    // }

    // console.log(reviewImageArray)
    // console.log(currentUserReviews.dataValues)
    // if (currentUserReviews.dataValues.ReviewImages) currentUserReviews.dataValues.ReviewImages = reviewImageArray

   return res.status(200).json({
        Reviews: reviewsConverted
    })
})

router.delete('/:reviewId', [restoreUser, requireAuth], async (req, res) => {
    const reviewToDelete = await Review.findByPk(req.params.reviewId)

    // console.log(reviewToDelete)
    if (!reviewToDelete) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviewToDelete.userId !== req.user.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }

    await reviewToDelete.destroy()

    res.status(200)
   return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })

})

router.post('/:reviewId/images', [restoreUser, requireAuth], async (req, res) => {

    const { url } = req.body

    // console.log(req.params.reviewId)

    // const reviewIdNotFoundCheck = await Review.findByPk()

    const reviewToAddImage = await Review.findByPk(req.params.reviewId)

    if (!reviewToAddImage) {
      return  res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    const reviewImageCheck = await ReviewImage.findAll({
        where: {
            reviewId: reviewToAddImage.id
        }
    })

    // if (!reviewToAddImage) {

    // }
    // console.log(reviewImageCheck.length)

    if (reviewImageCheck.length > 10) {
    return    res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    }
    // console.log(reviewImageToAdd)
    //check if user owns the review


    const createdImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        "url": url
    })

    const jsonResponse = {
        "id": createdImage.id,
        "url": createdImage.url
    }



   return res.status(200).json(jsonResponse)
})


router.put('/:reviewId', [restoreUser, requireAuth], async (req, res) => {
    const { review, stars } = req.body

    const reviewToEdit = await Review.findByPk(req.params.reviewId)

    const validationError = {
    "message": "Validation error",
      "statusCode": 400,
      "errors": {}
    }

    if (!review) validationError.errors.review = "Review text is required"
    if (!stars || parseInt(stars) < 1 || parseInt(stars) > 5) validationError.errors.stars = "Stars must be an integer from 1 to 5"

    if (!review || !stars) {
        res.status(400).json(validationError)
    }

    if (!reviewToEdit) {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if (review) reviewToEdit.review = review
    if (stars) reviewToEdit.stars = stars

    await reviewToEdit.save()

   return res.status(200).json(reviewToEdit)
})

router.delete('/:reviewId', [restoreUser, requireAuth], async (req, res) => {

    const reviewToDelete = await Review.findByPk(req.params.reviewId)


    if (!reviewToDelete) {
        res.status(404)
       return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviewToDelete.userId !== req.user.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }

    await reviewToDelete.destroy()

    res.status(200)
   return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})

module.exports = router
