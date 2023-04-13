import { useHistory } from 'react-router-dom'
import './HomePageCards.css'


const HomePageCards = ({spot}) => {
  const history = useHistory()

  const imageClickHandler = () => {
    history.push(`/spots/${spot.id}`)
  }

    return (
        <div className='card-container'>
          <i className="fa-solid fa-star"></i>
          <img src={spot.previewImage} alt="location" onClick={imageClickHandler}/>
          {Number(spot.avgRating) ? <p>{spot.avgRating}</p> : <p>New</p>}
          <p className='description'>{spot.description}</p>
          <p className='address'>{`${spot.city}, ${spot.state}`}</p>
          <p className='price'>{`$${spot.price}night`}</p>
        </div>
    )
}

export default HomePageCards
