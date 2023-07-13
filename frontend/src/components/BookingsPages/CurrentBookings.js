import { useDispatch, useSelector } from 'react-redux'
import './CurrentBookings.css'
import { useEffect } from 'react'
import { getCurrentBookingsThunk } from '../../store/bookings'
import BookingsCard from '../UI/Card/BookingsCard'

const CurrentBookings = () => {
    const dispatch = useDispatch()
    const bookings = useSelector(state => Object.values(state.bookings.allBookings))
    // console.log('BOOOKINGS', bookings)

    useEffect(() => {
        dispatch(getCurrentBookingsThunk())
    }, [dispatch])

    return (
        <div className='your-bookings-container'>
            <h1>Your bookings</h1>
            {bookings?.map(booking => {
                // console.log('booking', booking.Spot)

                return (
                    <BookingsCard
                    booking={booking}
                    bookingSpot={booking.Spot}
                    />
                )
            })}
        </div>
    )
}

export default CurrentBookings
