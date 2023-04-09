import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import './SpotsDetails.css'
import { useEffect } from "react"
import { getSpotsDetailsThunk } from "../../store/spots"

const SpotsDetails = () => {
    const { spotId } = useParams()
    // console.log(spotId)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotsDetailsThunk())
    }, [dispatch])

    const spotsDetailsObjectFromReducer = useSelector(state => state.spots)
    const spotsDetailsDataFromSelector = Object.values(spotsDetailsObjectFromReducer.allSpots)
    // console.log(spotsDetailsDataFromSelector)

    if (!spotsDetailsDataFromSelector) return null

    return (
        <div>Spots are cool bro.</div>
    )
}

export default SpotsDetails
