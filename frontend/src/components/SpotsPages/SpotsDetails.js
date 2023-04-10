import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getSpotsDetailsThunk } from "../../store/spots"
import './SpotsDetails.css'

const SpotsDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spotsDetails = useSelector(state => state.spots.allSpots)
    // const spotsDetailsWithId = useSelector(state => console.log(state))

    useEffect(() => {
        dispatch(getSpotsDetailsThunk(spotId))
    }, [dispatch, spotId])

    // console.log(Object.values(spotsDetails).length)
    const owner = spotsDetails.Owner
    const ownerCopy = {...owner}
    const spotsDetailsCopy = {...spotsDetails}
    console.log(spotsDetailsCopy)
    if (!spotsDetails) return null

    console.log(ownerCopy)
    // console.log(ownerCopy.SpotImages)

    return (
        <div>
             <h1>{spotsDetails.name}</h1>
             <div>
             {spotsDetailsCopy.SpotImages && spotsDetailsCopy.SpotImages.map(spotImage => {
                return (
                <img src={spotImage.url} alt='location' />
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

export default SpotsDetails
