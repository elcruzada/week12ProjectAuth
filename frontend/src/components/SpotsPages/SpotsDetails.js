import { Route, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getSpotsDetailsThunk } from "../../store/spots"
import { getAllReviewsThunk } from "../../store/reviews"

import SpotsDetailsCard from "../UI/Card/SpotsDetailsCard"
import './SpotsDetails.css'
// import SpotsDetailsReviewsState from "../StateHandling/SpotsDetailsReviewsState"

const SpotsDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const singleSpot = useSelector(state => state.spots.singleSpot)
    const allSpotReviews = useSelector(state => state.reviews.spot)
    const sessionUser = useSelector((state) => state.session.user)
    console.log(singleSpot)
    // const singleSpot = useSelector(state => console.log(state))


    useEffect(() => {
        dispatch(getSpotsDetailsThunk(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId))
    }, [dispatch, spotId])

    if (!singleSpot) return null

    return (
        <>
        <SpotsDetailsCard
        singleSpot={singleSpot}
        allSpotReviews={allSpotReviews}
        sessionUser={sessionUser}
        />
        </>
    )
}

export default SpotsDetails
