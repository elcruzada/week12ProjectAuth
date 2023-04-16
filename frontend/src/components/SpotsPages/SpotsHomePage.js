import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpotsThunk } from '../../store/spots'
import HomePageCards from '../UI/Card/HomePageCards'
// import Tooltip from '../UI/Tooltip/Tooltip1'
import './SpotsHomePage.css'


const SpotsHomePage = () => {
    const dispatch = useDispatch()
    const spotsObjectFromReducer = useSelector(state => state.spots)
    const spotsDataFromSelector = Object.values(spotsObjectFromReducer.allSpots)
    console.log(spotsObjectFromReducer)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    // console.log(spotsObjectFromReducer)
    // console.log(spotsDataFromSelector)


    if (!spotsObjectFromReducer) return null

    return (
        // <div className="spot-container">
        //  {spotsDataFromSelector.map(spot => (
        //     <Tooltip spot={spot} key={spot.id} className="home-page-tooltip">
        //     <HomePageCards spot={spot} key={spot.id} />
        //   </Tooltip>
        //  ))}
        // </div>
        <div className="spot-container">
        {spotsDataFromSelector.map(spot => (
          <div key={spot.id} className="home-page-tooltip">
            <HomePageCards spot={spot} />
            <div className="home-page-tooltip-text">{spot.name}</div>
          </div>
        ))}
      </div>
    )

}

export default SpotsHomePage
