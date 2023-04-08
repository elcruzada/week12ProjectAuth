import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpotsThunk } from '../../store/spots'
import './SpotsHomePage.css'


const SpotsHomePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const spotsObjectFromReducer = useSelector(state => state.spots)
    // console.log(spotsObjectFromReducer)
    const spotsDataFromSelector = Object.values(spotsObjectFromReducer.allSpots)
    console.log(spotsDataFromSelector)


    if (!spotsObjectFromReducer) return null

    return (
        <div className='container'>
        <h1>Booping Cool Places</h1>

        {spotsDataFromSelector.map(spot => {
            // console.log(spot)
            return (
                <>
                <img src={spot.previewImage}></img>
                <p>{spot.description}</p>
                </>
            )
        })}
        </div>
    )

}

export default SpotsHomePage
