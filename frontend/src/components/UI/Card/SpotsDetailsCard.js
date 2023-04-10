import './SpotsDetailsCard.css'

const SpotsDetailsCard = ({spotsDetails, ownerCopy}) => {

    return (
        <div>
             <h1>{spotsDetails.name}</h1>
             <div>
             {spotsDetails.SpotImages && spotsDetails.SpotImages.map(spotImage => {
                return (
                <img src={spotImage.url} alt='location' key={spotImage.id}/>
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
        </div>
    )
}

export default SpotsDetailsCard
