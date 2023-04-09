import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getSpotsDetailsThunk } from "../../store/spots"
import './SpotsDetails.css'

const SpotsDetails = () => {
    const { spotId } = useParams()
    // console.log(spotId)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotsDetailsThunk(spotId))
    }, [dispatch])

    const spotsDetails = useSelector(state => state.spots.allSpots)
    // const spotsDetailsDataFromSelector = Object.values(spotsDetailsObjectFromReducer.allSpots)
    // const filteredSpot = spotsDetailsDataFromSelector.filter(spot => spot.id === Number(spotId))[0]

    if (!spotsDetails) return null

    return (
        <div>
            <h1>{spotsDetails.name}</h1>
            <p>
            {`${spotsDetails.city}, ${spotsDetails.state}, ${spotsDetails.country}`}
            </p>
        </div>
    )
}

export default SpotsDetails
