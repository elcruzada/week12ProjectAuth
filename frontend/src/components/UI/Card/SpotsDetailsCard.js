import React from 'react'

import './SpotsDetailsCard.css'

const SpotsDetailsCard = ({singleSpot, allSpotReviews, sessionUser}) => {
    // console.log('spotsDetails', spotsDetails)
    // console.log('ownerCopy', ownerCopy)
    // console.log('single', singleSpot)
    // console.log('owner', owner)
    // console.log(singleSpot)
    // const {singleSpot} = singleSpot
    //jsonstringify
    const singleSpotCopy = {...singleSpot}
    const singleSpotUser = singleSpotCopy.User
    const newUserCopy = {...singleSpotUser}
    // console.log(singleSpot)
    // console.log(allSpotReviews)
    // const singleSpotCopy.Reviews.length
    //do 20 - 23 later on

    return (
        <>
        <div>
             <h1>{singleSpotCopy.name}</h1>
             <div>
             {singleSpotCopy.SpotImages && singleSpotCopy.SpotImages.map(spotImage => {
                return (
                <img src={spotImage.url} alt='location' key={spotImage.url}/>
                )
            })}
             </div>
            <p>
            {`${singleSpotCopy.city}, ${singleSpotCopy.state}, ${singleSpotCopy.country}`}
            </p>
            <div>
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length === 0 && <i class="fa-solid fa-period"></i>}
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length === 1 && <p>1 Review</p>}
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length > 1 && <p>{`${singleSpotCopy.Reviews.length} Reviews`}</p>}
            </div>
            <p>
                {`Hosted by: ${newUserCopy.firstName}, ${newUserCopy.lastName}`}
            </p>
            <p>
                {singleSpotCopy.description}
            </p>
            <p>{`$${singleSpotCopy.price}night`}</p>
            <div>
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length === 0 && <i class="fa-solid fa-period"></i>}
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length === 1 && <h2>1 Review</h2>}
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length > 1 && <h2>{`${singleSpotCopy.Reviews.length} Reviews`}</h2>}
            </div>
            <div className='review-list-container'>
            {Object.values(allSpotReviews).length === 0 &&
                sessionUser &&
                <p>Be the first to Review!</p>}
            <ul>
            {Object.values(allSpotReviews).length > 0 &&
            Object.values(allSpotReviews).map(review => {
               return (
                <div key={review.id}>
                <li>
                    <h3>{review.User.firstName}</h3>
                    <p>{review.review}</p>
                    <p>{review.createdAt}</p>
                    <button>Delete</button>
                </li>
                </div>
               )
            })
            }
            </ul>
            </div>

        </div>
        <button onClick={() => alert('Feature coming soon')}>Reserve</button>

        </>
    )
}

export default SpotsDetailsCard
