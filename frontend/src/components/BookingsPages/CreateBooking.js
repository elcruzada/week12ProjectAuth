import React, { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import './CreateBooking.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { createBookingThunk } from '../../store/bookings'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpotsThunk, getSpotsDetailsThunk } from '../../store/spots';

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref}
    className='select-checkin-checkout'
    >
        Select Check-in Date
    </button>
));
const CustomInput2 = React.forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref}
    className='select-checkin-checkout'
    >
        Select Checkout Date
    </button>
));

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
    }, [dispatch])

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
    }, [bookedDates, spotId]);

    const dateFormatter = (dateInput) => {

        let date = new Date(dateInput);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

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
            <h1 style={{marginBottom: '5rem'}}>Booking Details</h1>
            <div className='create-booking-container-booking-image'>

                <div className='create-booking-column-container'>
                    <div className='create-booking-column-container-left-column'>
                        <div
                            className='check-in-checkout-container'
                            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}
                        >
                            <div
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <p style={{fontSize: '20px', borderBottom: '2px solid black', textAlign: 'center', padding: '3px'}}>
                                CHECK-IN
                                </p>
                                <p
                                style={{textAlign: 'center', fontWeight: 'bold'}}
                                >{dateFormatter(selectedCheckinDate)}</p>
                                {/* <input type='date'
                                value={checkin}
                                onChange={(e) => setCheckin(e.target.value)}
                            >
                            </input> */}
                                <DatePicker
                                    selected={selectedCheckinDate}
                                    onChange={(date) => setSelectedCheckinDate(date)}
                                    excludeDates={bookedDates}
                                    minDate={new Date()}
                                    style={{ cursor: 'pointer' }}
                                    customInput={<CustomInput />}
                                />
                            </div>
                            <div
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <p style={{fontSize: '20px', borderBottom: '2px solid black', textAlign: 'center', padding: '3px'}}
                                >
                                CHECKOUT
                                </p>
                                <p
                                style={{textAlign: 'center', fontWeight: 'bold'}}
                                >{dateFormatter(selectedCheckoutDate)}</p>
                                {/* <input type='date'
                                value={checkout}
                                onChange={(date) => setSelectedCheckoutDate(date)}
                                >
                            </input> */}
                                <DatePicker
                                    selected={selectedCheckoutDate}
                                    onChange={(date) => setSelectedCheckoutDate(date)}
                                    excludeDates={bookedDates}
                                    minDate={new Date()}
                                    style={{ cursor: 'pointer' }}
                                    customInput={<CustomInput2 />}
                                />

                            </div>
                        </div>
                    </div>
                    <button
                        className='confirm-booking-button'
                        onClick={createBookingHandler}
                        style={{marginLeft: '12rem', marginTop: '4rem', padding: '1rem', fontSize: '20px', cursor: 'pointer', borderRadius: '20px', fontWeight: 'bold', boxShadow: '5px 10px'}}
                    >Confirm your booking</button>
                </div>
                <div className='create-booking-column-image-container'>
                    <img src={bookingSpot?.previewImage}
                    style={{height: '15rem', width: '20rem', borderRadius: '10px'}}
                    >
                    </img>
                    <p
                    style={{fontSize: '25px', fontWeight: 'bold'}}
                    >{bookingSpot?.name}</p>
                    <div
                    style={{display: 'flex', justifyContent: 'space-between'}}
                    >
                    <p>{bookingSpot?.city}</p>
                    <p>{bookingSpot?.state}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateBooking
