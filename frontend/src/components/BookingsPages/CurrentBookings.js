import { useDispatch, useSelector } from 'react-redux'
import './CurrentBookings.css'
import { useEffect } from 'react'
import { getCurrentBookingsThunk } from '../../store/bookings'
import BookingsCard from '../UI/Card/BookingsCard'
import { useHistory } from 'react-router-dom'

const CurrentBookings = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const bookings = useSelector(state => Object.values(state.bookings.allBookings))
    // console.log('BOOOKINGS', bookings)

    useEffect(() => {
        dispatch(getCurrentBookingsThunk())
    }, [dispatch])

    return (
        <>
        <div className='your-bookings-container'>
            <h1>Your bookings</h1>
        {
            bookings.length === 0 ?
            <div>
                <h2>You don't have any bookings! Check out spots and reserve one today!</h2>
                <button
                style={{cursor: 'pointer', fontWeight: 'bold'}}
                className='manage-spots-create-button'
                onClick={() => history.push('/')}
                >Choose a place to book</button>
            </div>
            :

            bookings?.map(booking => {
                // console.log('booking', booking.Spot)

                return (
                    <BookingsCard
                    booking={booking}
                    bookingSpot={booking.Spot}
                    />
                )
            })
        }
        </div>
        </>
    )
}

export default CurrentBookings
