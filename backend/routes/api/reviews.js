const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const review = require('../../db/models/review')

router.get('/current',[restoreUser, requireAuth], async (req, res) => {

    const currentUserReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model:User
            },
            {
                model: Spot
            },
            // {
            //     model: ReviewImage,
            //     // where: {
            //     //     reviewId: id
            //     // }
            // }
        ]
    })

    // console.log(currentUserReviews)

    const reviewImages = await ReviewImage.findAll({
        // where: {
        attributes: {
            exclude: ['reviewId', 'createdAt', 'updatedAt']
        }
        // }
    })
    //need to put review images there
    const reviewImageArray = []
    for (let i = 0; i < reviewImages.length; i++) {
        let review = reviewImages[i].dataValues
        // console.log(review)
        reviewImageArray.push(review)
        // if (ReviewImage)
    }

    // console.log(reviewImageArray)
    console.log(currentUserReviews.dataValues)
    // if (currentUserReviews.dataValues.ReviewImages) currentUserReviews.dataValues.ReviewImages = reviewImageArray

    res.status(200).json({
        Reviews: currentUserReviews
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
        throw new Error('Invalid')
    }

    await reviewToDelete.destroy()

    res.status(200)
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })

})

router.post('/:reviewId/images', [restoreUser, requireAuth], async (req, res) => {

    const { url } = req.body

    // console.log(req.params.reviewId)

    const reviewToAddImage = await Review.findByPk(req.params.reviewId)

    const reviewImageCheck = await ReviewImage.findAll({
        where: {
            reviewId: reviewToAddImage.id
        }
    })

    // console.log(reviewImageCheck.length)

    if (reviewImageCheck.length > 10) {
        res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    }
    // console.log(reviewImageToAdd)
    //check if user owns the review

    if (!reviewToAddImage) {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    const createdImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        "url": url
    })

    const jsonResponse = {
        "id": createdImage.id,
        "url": createdImage.url
    }



    res.status(200).json(jsonResponse)
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

    res.status(200).json(reviewToEdit)
})

router.delete('/:reviewId', [restoreUser, requireAuth], async (req, res) => {

    const reviewToDelete = await Review.findByPk(req.params.reviewId)


    if (!reviewToDelete) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviewToDelete.userId !== req.user.id) {
        throw new Error('Invalid')
    }

    await reviewToDelete.destroy()

    res.status(200)
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})

module.exports = router
