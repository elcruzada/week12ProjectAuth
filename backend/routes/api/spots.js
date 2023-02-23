const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const Sequelize = require("sequelize")

router.get('/', async (req, res) => {

    const Spots = await Spot.findAll()

    const Rating = await Review.findAll({
        attributes: ['spotId', 'stars']
    })

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
    // for (let i = 0; i < spotsReviewImage.length; i++) {
    //     let oneSpot = spotsReviewImage[i]

    //     let reviews = oneSpot.Reviews
    //     let spotImages = oneSpot.spotImages

    //     let totalStar = 0

    //     for (let j = 0; j < reviews.length; j++) {
    //         let review = reviews[j]

    //     }
    // }

    res.json(spotsObjects)
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


module.exports = router
