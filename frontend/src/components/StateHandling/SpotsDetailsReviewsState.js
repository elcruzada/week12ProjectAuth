import { useDispatch, useSelector } from "react-redux"
import { getAllReviewsThunk } from "../../store/reviews"
import {useEffect} from 'react'
import { useParams } from "react-router-dom"

const SpotsDetailsReviewsState = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const reviews = useSelector(state => console.log(state))
    // console.log(reviews)
    useEffect(() => {

        dispatch(getAllReviewsThunk(spotId))
    }, [dispatch, spotId])

    return (
        <>
            <h1>Hello</h1>
        </>
    )
}

export default SpotsDetailsReviewsState
