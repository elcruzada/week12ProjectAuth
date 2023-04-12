import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpotsThunk } from "../../store/spots"
import ManageSpotsCard from "../UI/Card/ManageSpotsCard"

const ManageSpots = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const getAllSpots = useSelector(state => state.spots.allSpots)
    const iterableAllSpots = Object.values(getAllSpots)

    // console.log(iterableAllSpots)
    const userSpots = iterableAllSpots.filter(sessionUserSpot => sessionUser.id === sessionUserSpot.ownerId)
    // console.log(userSpots)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    },[dispatch])


    return (
        <ManageSpotsCard userSpots={userSpots}/>
    )
}

export default ManageSpots
