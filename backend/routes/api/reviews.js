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
            {
                model: ReviewImage
            }
        ]
    })

    res.json({
        "Reviews": currentUserReviews
    })
})

router.delete('/:reviewId', [restoreUser, requireAuth], async (req, res) => {
    const reviewToDelete = await Review.findByPk(req.params.reviewId)

    console.log(reviewToDelete)
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

// const reviews = await Review.findAll({
//     include: [
//         {model: User,
//         attributes: { exclude: ['username']}
//         },
//         {
//             model: Spot
//         },
//         {
//             model: ReviewImage
//         }
//     ],
//     where: {userId: req.user.id},
//     attributes: {exclude: ['userId']}
// })

// res.json(reviews)
module.exports = router
