import './HomePageCards.css'

const HomePageCards = ({spot}) => {
    // console.log(spots)
    return (
        <div>
          <img src={spot.previewImage} alt="location" />
          <p className='description'>{spot.description}</p>
          <p className='address'>{`${spot.city},${spot.state}`}</p>
          <p className='price'>{`$${spot.price}night`}</p>
        </div>
    )
}

export default HomePageCards
