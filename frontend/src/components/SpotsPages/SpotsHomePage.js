import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpotsThunk } from '../../store/spots'
import HomePageCards from '../UI/Card/HomePageCards'
// import Tooltip from '../UI/Tooltip/Tooltip1'
import './SpotsHomePage.css'


const SpotsHomePage = () => {
  const dispatch = useDispatch()
  const [isSearch, setIsSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [spots, setSpots] = useState([]);
  const spotsObjectFromReducer = useSelector(state => state.spots)
  const spotsDataFromSelector = Object.values(spotsObjectFromReducer.allSpots)
  // console.log('ZPOOOOOTS', spotsDataFromSelector)
  // console.log(spotsObjectFromReducer)

  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch])

  // console.log(spotsObjectFromReducer)
  // console.log(spotsDataFromSelector)

  useEffect(() => {

    // const search = () => {

    // fetch(`http://localhost:8000/api/spots/search?searchQuery=${searchQuery}`).then(setSpots());

    // const data =  res.json();
    // console.log('DAATA', res)
    // };
    if (searchQuery === '') {
      setIsSearch(false)
    } else if (searchQuery !== '') {

      fetch(`/api/spots/search?searchQuery=${searchQuery}`)
        .then(response => response.json())
        // .then(data => console.log('DDAAATA', data[0]))
        .then(data => {
          // console.log('DDAAATA', data)
          setSpots(data)
        }
          )
        .catch(error => console.error(error));
    } else {
      setSpots([])
    }
  }, [searchQuery])

  useEffect(() => {
    console.log('SPoooooooooooooOOTS', searchQuery)
  }, [searchQuery])

  if (!spotsObjectFromReducer) return null

  return (
    // <div className="spot-container">
    //  {spotsDataFromSelector.map(spot => (
    //     <Tooltip spot={spot} key={spot.id} className="home-page-tooltip">
    //     <HomePageCards spot={spot} key={spot.id} />
    //   </Tooltip>
    //  ))}
    // </div>
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px', display: 'flex', marginTop: '.5rem' }}>
        <input
          style={{ height: '1.5rem', width: '15rem', padding: '.5rem' }}
          type='text'
          placeholder='Search for your spot'
          value={searchQuery} onChange={e => {
            setSearchQuery(e.target.value)
            setIsSearch(true)
          }
          }
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {
        isSearch && Array.isArray(spots) &&
        <div className='spot-container'>

        {spots.map(spot => (

          <div key={spot?.id} className="home-page-tooltip">
            <HomePageCards spot={spot} />
            <div className="home-page-tooltip-text">{spot.name}</div>
          </div>
        ))}
        </div>
      }
      {/* <div>
        <input />
        <button onClick={search}>Search</button>
      </div> */}
      {
        !isSearch &&
        <div className="spot-container">
          {spotsDataFromSelector.map(spot => (
            <div key={spot.id} className="home-page-tooltip">
              <HomePageCards spot={spot} />
              <div className="home-page-tooltip-text">{spot.name}</div>
            </div>
          ))}
        </div>
      }
    </>
  )

}

export default SpotsHomePage
