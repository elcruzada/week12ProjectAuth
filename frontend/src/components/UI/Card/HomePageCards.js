import { useHistory } from 'react-router-dom'
import './HomePageCards.css'

const HomePageCards = ({ spot }) => {
  const history = useHistory()

  const imageClickHandler = () => {
    history.push(`/spots/${spot.id}`)
  }

  return (
    <div className='card-container'
    onClick={imageClickHandler}>
      <div className="card-image">
        <img src={spot?.previewImage} alt="location"  />
      </div>
      <div className="card-content">
        <div>
          <h3 className='card-title'>{spot.title}</h3>
          <div className="card-city">{`${spot.city}, ${spot.state}`}</div>
          <div className="card-price">{`$${spot.price} / night`}</div>
        </div>
        <div className="card-actions">
          <div className="card-rating">
            <i className="fa-solid fa-star"></i>
            <span>{Number(spot.avgRating) ? spot.avgRating : 'New'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageCards
