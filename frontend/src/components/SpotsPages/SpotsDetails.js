import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getSpotsDetailsThunk } from "../../store/spots"
import './SpotsDetails.css'

const SpotsDetails = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spotsDetails = useSelector(state => state.spots.allSpots)
    console.log(spotsDetails)

    useEffect(() => {
       dispatch(getSpotsDetailsThunk(spotId))
    }, [dispatch, spotId])

    // console.log(Object.values(spotsDetails).length)
    const owner = spotsDetails.Owner
    const ownerCopy = {...owner}
    if (!spotsDetails) return null

    return (
        <div>
             <h1>{spotsDetails.name}</h1>
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
