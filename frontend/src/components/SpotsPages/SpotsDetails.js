import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getSpotsDetailsThunk } from "../../store/spots"
import SpotsDetailsCard from "../UI/Card/SpotsDetailsCard"
import './SpotsDetails.css'

const SpotsDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const singleSpot = useSelector(state => state.spots.singleSpot)
    // const singleSpot = useSelector(state => console.log(state))

    useEffect(() => {
        dispatch(getSpotsDetailsThunk(spotId))
    }, [dispatch, spotId])

    if (!singleSpot) return null

    return (
        // <></>
        <SpotsDetailsCard singleSpot={singleSpot} />


    )
}

export default SpotsDetails
