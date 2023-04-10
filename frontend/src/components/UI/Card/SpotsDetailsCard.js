import React from 'react'

import './SpotsDetailsCard.css'

const SpotsDetailsCard = ({spotsDetails, ownerCopy}) => {
    // console.log('spotsDetails', spotsDetails)
    // console.log('ownerCopy', ownerCopy)

    return (
        <>
        <div>
             <h1>{spotsDetails.name}</h1>
             <div>
             {spotsDetails.SpotImages && spotsDetails.SpotImages.map(spotImage => {
                return (
                <img src={spotImage.url} alt='location' key={spotImage.url}/>
                )
            })}
             </div>
            <p>
            {`${spotsDetails.city}, ${spotsDetails.state}, ${spotsDetails.country}`}
            </p>
            <p>
                {`Hosted by: ${ownerCopy.firstName}, ${ownerCopy.lastName}`}
            </p>
            <p>
                {spotsDetails.description}
            </p>
            <p>{`$${spotsDetails.price}night`}</p>
        </div>
        <button onClick={() => alert('Feature coming soon')}>Reserve</button>
        </>
    )
}

export default SpotsDetailsCard
