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
    const singleSpotUser = singleSpotCopy.User
    const newUserCopy = {...singleSpotUser}
    console.log(singleSpot)

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
            <p>
                {`Hosted by: ${newUserCopy.firstName}, ${newUserCopy.lastName}`}
            </p>
            <p>
                {singleSpotCopy.description}
            </p>
            <p>{`$${singleSpotCopy.price}night`}</p>
        </div>
        <button onClick={() => alert('Feature coming soon')}>Reserve</button>

        </>
    )
}

export default SpotsDetailsCard
