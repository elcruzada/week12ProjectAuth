import './BookingsCard.css'

const BookingsCard = ({booking}) => {

    return (
        <div className='bookings-city-card'>
                <div className='bookings-city-card-left-column'>
                    <img src={booking?.Spot.previewImage}alt='bookings-card'/>
                </div>
                <div className='bookings-city-card-right-column'>
                    <p>
                    City: {booking?.Spot.city}
                    </p>
                    <p>
                    Location name: {booking?.Spot.name}
                    </p>
                    <p>
                        {booking?.startDate}
                    </p>
                    <p>
                        {booking?.endDate}
                    </p>

                </div>
                </div>
    )
}

export default BookingsCard
