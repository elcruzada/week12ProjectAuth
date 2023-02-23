// let reviews = await Review.findAll({
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
