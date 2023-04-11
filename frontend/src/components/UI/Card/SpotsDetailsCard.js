import React from 'react'

import './SpotsDetailsCard.css'

const SpotsDetailsCard = ({singleSpot}) => {
    // console.log('spotsDetails', spotsDetails)
    // console.log('ownerCopy', ownerCopy)
    // console.log('single', singleSpot)
    // console.log('owner', owner)
    // console.log(singleSpot)
    // const {singleSpot} = singleSpot
    const singleSpotCopy = {...singleSpot}
    console.log(singleSpot)

    return (
        <>
        <div>
             <h1>{singleSpot.name}</h1>
             <div>
             {singleSpot.SpotImages && singleSpot.SpotImages.map(spotImage => {
                return (
                <img src={spotImage.url} alt='location' key={spotImage.url}/>
                )
            })}
             </div>
            <p>
            {`${singleSpot.city}, ${singleSpot.state}, ${singleSpot.country}`}
            </p>
            <p>
                {`Hosted by: ${singleSpotCopy.User.firstName}, ${singleSpotCopy.User.lastName}`}
            </p>
            <p>
                {singleSpot.description}
            </p>
            <p>{`$${singleSpot.price}night`}</p>
        </div>
        <button onClick={() => alert('Feature coming soon')}>Reserve</button>

        </>
    )
}

export default SpotsDetailsCard
