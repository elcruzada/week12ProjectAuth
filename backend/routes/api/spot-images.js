const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const review = require('../../db/models/review')



router.delete('/:spotImageId', requireAuth, async (req, res) => {
    // const spotImageToDelete = await Spot.findByPk(req.params.spotImageId)

    // if (!spotImageToDelete) {
    //     res.status(404)
    //     res.json({
    //         "message": "Spot couldn't be found",
    //         "statusCode": 404
    //     })
    // }

    // if (spotImageToDelete.ownerId !== req.user.id) {
    //     throw new Error('Invalid')
    // }

    // await spotToDelete.destroy()

    // res.status(200)
    // res.json({
    //   "message": "Successfully deleted",
    //   "statusCode": 200
    // })
})




module.exports = router
