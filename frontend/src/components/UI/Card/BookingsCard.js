import DeleteBookingModal from '../../BookingsPages/DeleteBookingModal'
import UpdateBookingModal from '../../BookingsPages/UpdateBookingModal'
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem'
import './BookingsCard.css'

const BookingsCard = ({ booking, bookingSpot }) => {

    const bookingId = booking?.id

    return (
        <div className='bookings-city-card'>
            <div className='bookings-city-card-left-right-wrapper'>
                <div className='bookings-city-card-left-column'>
                    <img src={booking?.Spot.previewImage} alt='bookings-card'
                        style={{ height: '10rem', width: 'auto' }}
                    />
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
            <div classnName='bookings-update-delete'
                style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}
            >

                {
                    new Date(booking?.startDate) < new Date() ?
                        <p style={{fontWeight: 'bold'}}>Bookings that have been started can't be updated</p> :

                        <OpenModalMenuItem
                            itemText={<button className='post-booking-container'>Update</button>}
                            modalComponent={<UpdateBookingModal booking={booking} bookingId={bookingId} bookingSpot={bookingSpot} />}
                        />
                }

                {
                    new Date(booking?.startDate) < new Date() ?
                        <p style={{fontWeight: 'bold'}}>Bookings that have been started can't be deleted</p> :

                        <OpenModalMenuItem
                            itemText={<button className='post-booking-container'>Delete</button>}
                            modalComponent={<DeleteBookingModal booking={booking} bookingId={bookingId} bookingSpot={bookingSpot} />}
                        />
                }

            </div>
        </div>
    )
}

export default BookingsCard
