import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotsDetailsThunk } from "../../store/spots"

const ManageSpots = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    // console.log(sessionUser.id)
    // const fetchAllSpotsOfUser = useSelector(state => state.spots.allSpots)
    // console.log(fetchUserSpots)
    // console.log(fetchAllSpotsOfUser)
    // const sessionUserId = {...sessionUser.id}
    const singleSpot = useSelector(state => state.spots.singleSpot.SpotImages)
    const singleSpotArray = Object.values(singleSpot)
    console.log(singleSpotArray)

    useEffect(() => {
        dispatch(getSpotsDetailsThunk(sessionUser.id))
    },[dispatch])

    // const singleSpotCopy = {...singleSpot.SpotImages}
    // console.log(singleSpotCopy)

    return (
        <>
        {/* {singleSpotCopy.map(spot => {
            return console.log(spot)
        })} */}
        </>
    )
}

export default ManageSpots
