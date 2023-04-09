import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpotsThunk } from '../../store/spots'
import HomePageCards from '../UI/Card/HomePageCards'
import Tooltip from '../UI/Tooltip/Tooltip'
import './SpotsHomePage.css'


const SpotsHomePage = () => {
    const dispatch = useDispatch()
    const spotsObjectFromReducer = useSelector(state => state.spots)
    const spotsDataFromSelector = Object.values(spotsObjectFromReducer.allSpots)


    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    // console.log(spotsObjectFromReducer)
    // console.log(spotsDataFromSelector)


    if (!spotsObjectFromReducer) return null

    return (
        <div className="container">
         {spotsDataFromSelector.map(spot => (
            <Tooltip spot={spot} key={spot.id}>
                <HomePageCards spot={spot} key={spot.id}/>
            </Tooltip>
         ))}
        </div>
    )

}

export default SpotsHomePage
