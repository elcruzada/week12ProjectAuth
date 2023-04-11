import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpotsThunk } from "../../store/spots"

const ManageSpots = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const getAllSpots = useSelector(state => state.spots.allSpots)
    const iterableAllSpots = Object.values(getAllSpots)
    // const allSpots = Object.values(getAllSpotsOfUser)[0]
    // console.log(iterableAllSpots)
    const userSpots = iterableAllSpots.filter(sessionUserSpot => sessionUser.id === sessionUserSpot.ownerId)
    console.log(userSpots)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    },[dispatch])

    // const singleSpotCopy = {...singleSpot.SpotImages}
    // console.log(singleSpotCopy)


    return (
        <>
        <h1>Manage Your Spots</h1>
        <h2>Create a New Spot</h2>
        {userSpots.map(spot => {
            console.log(spot)

        })}
        </>
    )
}

export default ManageSpots
