const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const review = require('../../db/models/review')



router.delete('/:spotImageId', restoreUser, requireAuth, async (req, res) => {
    const spotImageToDelete = await SpotImage.findByPk(req.params.spotImageId)
    // console.log(spotImageToDelete)


    // console.log(spotToConnectToUser)
    // console.log(authorizedUser.dataValues.id)
    // console.log(spotImageToDelete)
    if (!spotImageToDelete) {
        res.status(404)
        return  res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
    const spotToConnectToUser = await Spot.findByPk(spotImageToDelete.dataValues.spotId)

    const authorizedUser = await User.findByPk(spotToConnectToUser.dataValues.ownerId)

    if (authorizedUser.dataValues.id !== req.user.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }

    await spotImageToDelete.destroy()

    res.status(200)
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})




module.exports = router
