import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getSpotsDetailsThunk } from "../../store/spots"
import SpotsDetailsCard from "../UI/Card/SpotsDetailsCard"
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
    // const spotsDetailsCopy = {...spotsDetails}
    // console.log(spotsDetailsCopy)
    if (!spotsDetails) return null

    // console.log(spotsDetails)
    // console.log(ownerCopy)
    //prop for spotsDetails
    //prop for ownerCopy
    return (
        <SpotsDetailsCard spotsDetails={spotsDetails} ownerCopy={ownerCopy}/>
    )
}

export default SpotsDetails
