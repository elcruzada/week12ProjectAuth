const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const { Op } = require('sequelize')


router.delete('/:imageId', [restoreUser, requireAuth], async (req, res) => {

    const reviewImageToDelete = await ReviewImage.findByPk(req.params.imageId)


    if (!reviewImageToDelete) {
        res.status(404)
        return  res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    const reviewToConnectToUser = await Review.findByPk(reviewImageToDelete.dataValues.reviewId)

    const authorizedUser = await User.findByPk(reviewToConnectToUser.dataValues.userId)

    if (authorizedUser.dataValues.id !== req.user.id) {
        return res.status(403).json({
            "message": "Unauthorized user",
            "statusCode": 403
        })
    }

    await reviewImageToDelete.destroy()

    res.status(200)
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })


})









module.exports = router
