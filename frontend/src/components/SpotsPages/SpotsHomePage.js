import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpotsThunk } from '../../store/spots'
import HomePageCards from '../UI/Card/HomePageCards'
import './SpotsHomePage.css'


const SpotsHomePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const spotsObjectFromReducer = useSelector(state => state.spots)
    // console.log(spotsObjectFromReducer)
    const spotsDataFromSelector = Object.values(spotsObjectFromReducer.allSpots)
    // console.log(spotsDataFromSelector)


    if (!spotsObjectFromReducer) return null

    return (
        <div className="container">
         {spotsDataFromSelector.map(spot => (
        <HomePageCards spot={spot} />
        ))}
        </div>
    )

}

export default SpotsHomePage
