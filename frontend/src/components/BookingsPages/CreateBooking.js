import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import './CreateBooking.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { createBookingThunk } from '../../store/bookings'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpotsThunk, getSpotsDetailsThunk } from '../../store/spots';

const CreateBooking = () => {
    // const { closeModal } = useModal()
    const { spotId } = useParams()
    const bookingSpot = useSelector(state => state.spots.singleSpot)
    // console.log('BOOKING', bookingSpot)
    const dispatch = useDispatch()
    const history = useHistory()
    const [checkin, setCheckin] = useState('')
    const [checkout, setCheckout] = useState('')
    const [selectedCheckinDate, setSelectedCheckinDate] = useState(new Date())
    const [selectedCheckoutDate, setSelectedCheckoutDate] = useState(new Date())
    const [bookedDates, setBookedDates] = useState([])


    useEffect(() => {
        dispatch(getSpotsDetailsThunk(spotId))
    },[dispatch])

    useEffect(() => {
        fetch(`/api/bookings/booked/${spotId}`)
            .then((res) => res.json())
            .then((data) => {
                const dateArray = data.map((dateStr) => {
                    const date = new Date(dateStr);
                    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
                    return date;
                });
                setBookedDates(dateArray);
            })
            .catch((error) => console.error(error));
    }, []);

    const createBookingHandler = async () => {

        const errors = {}
        if (!selectedCheckinDate) errors.checkin = "Start date is required"
        if (!selectedCheckoutDate) errors.checkout = "End date is required"




        if (Object.values(errors).length === 0) {

            const bookingInput = {
                startDate: selectedCheckinDate,
                endDate: selectedCheckoutDate
            }

            const dispatchedCheckIn = await dispatch(createBookingThunk(spotId, bookingInput))
            if (dispatchedCheckIn) {
                history.push('/bookings/current')
            }
        }

    }

    return (
        <div className='create-booking-container'>
            <h1>Booking details</h1>
            <div className='create-booking-column-container'>
                <div className='create-booking-column-container-left-column'>
                    <h3>Dates</h3>
                    <div
                        className='check-in-checkout-container'
                        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}
                    >
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            CHECK-IN
                            {/* <input type='date'
                                value={checkin}
                                onChange={(e) => setCheckin(e.target.value)}
                            >
                            </input> */}
                            <DatePicker
                            selected={selectedCheckinDate}
                            onChange={(date) => setSelectedCheckinDate(date)}
                            excludeDates={bookedDates}
                            style={{cursor: 'pointer'}}
                            />
                        </div>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            >
                            CHECKOUT
                            {/* <input type='date'
                                value={checkout}
                                onChange={(date) => setSelectedCheckoutDate(date)}
                                >
                            </input> */}
                            <DatePicker
                            selected={selectedCheckoutDate}
                            onChange={(date) => setSelectedCheckoutDate(date)}
                            excludeDates={bookedDates}
                            style={{cursor: 'pointer'}}
                            />

                        </div>
                    </div>
                </div>
                <button
                onClick={createBookingHandler}
                >Confirm your booking</button>
                <div className='create-booking-column-container-right-column'>

                </div>
            </div>

        </div>
    )
}

export default CreateBooking
