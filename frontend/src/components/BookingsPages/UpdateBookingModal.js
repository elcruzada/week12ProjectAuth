import React, { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import './CreateBooking.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { createBookingThunk, editBookingThunk, getCurrentBookingsThunk } from '../../store/bookings'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'



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

const UpdateBookingModal = ({ booking, bookingId, bookingSpot }) => {
    const { closeModal } = useModal()

    const bookingSpotId = bookingSpot?.id
    // console.log(bookingSpotId)
    const dispatch = useDispatch()
    const history = useHistory()
    const [checkin, setCheckin] = useState(new Date())
    const [checkout, setCheckout] = useState(new Date())
    const [bookedDates, setBookedDates] = useState([])
    const [formErrors, setFormErrors] = useState({})


    // useEffect(() => {
    //     console.log('RRROZZZ', formErrors)
    // }, [formErrors])

    useEffect(() => {
        fetch(`/api/bookings/booked/${bookingSpotId}`)
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
    }, [bookedDates, bookingSpotId]);

    const dateFormatter = (dateInput) => {

        let date = new Date(dateInput);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    const updateBookingHandler = async () => {

        const errors = {}
        if (!checkin) errors.checkin = "Start date is required"
        if (!checkout) errors.checkout = "End date is required"
        if (new Date(checkin) > new Date(checkout)) errors.order = "Start date should not come after end date"


        if (Object.values(errors).length === 0) {

            const bookingInput = {
                startDate: checkin,
                endDate: checkout
            }



            const result = await dispatch(editBookingThunk(bookingInput, bookingId));
            if (result) {
                    dispatch(getCurrentBookingsThunk())
                    history.push('/bookings/current');
                    closeModal();
                }

        }
    }

    return (

        <div className='create-booking-container'
        style={{width: '50rem'}}
        >
            <h1 style={{marginBottom: '5rem'}}>Update Booking Details</h1>
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
                                >{dateFormatter(checkin)}</p>
                                {/* <input type='date'
                                value={checkin}
                                onChange={(e) => setCheckin(e.target.value)}
                            >
                            </input> */}
                                <DatePicker
                                    selected={checkin}
                                    onChange={(date) => setCheckin(date)}
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
                                >{dateFormatter(checkout)}</p>
                                {/* <input type='date'
                                value={checkout}
                                onChange={(date) => setSelectedCheckoutDate(date)}
                                >
                            </input> */}
                                <DatePicker
                                    selected={checkout}
                                    onChange={(date) => setCheckout(date)}
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
                        onClick={updateBookingHandler}
                        style={{marginLeft: '5rem', marginTop: '4rem', padding: '1rem', fontSize: '20px', cursor: 'pointer', borderRadius: '20px', fontWeight: 'bold', boxShadow: '5px 10px'}}
                    >Update your booking</button>
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
        // <div className='create-booking-container'
        // style={{width: '50rem', height: '50rem'}}
        // >
        //     <h1>Booking details</h1>
        //     <p>{formErrors.errors && formErrors.errors}</p>
        //     <div className='create-booking-column-container'>
        //         <div className='create-booking-column-container-left-column'>
        //             <h3>Dates</h3>
        //             <div
        //                 className='check-in-checkout-container'
        //                 style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}
        //             >
        //                 <div
        //                     style={{ display: 'flex', flexDirection: 'column' }}
        //                 >
        //                     CHECK-IN
        //                     <p>{dateFormatter(checkin)}</p>


        //                      <DatePicker
        //                     selected={checkin}
        //                     onChange={(date) => setCheckin(date)}
        //                     excludeDates={bookedDates}
        //                     minDate={new Date()}
        //                     style={{cursor: 'pointer'}}
        //                     customInput={<CustomInput />}
        //                     />

        //                 </div>
        //                 <div
        //                     style={{ display: 'flex', flexDirection: 'column' }}
        //                 >
        //                     CHECKOUT

        //                     <p>{dateFormatter(checkout)}</p>
        //                     <DatePicker
        //                     selected={checkout}
        //                     onChange={(date) => setCheckout(date)}
        //                     excludeDates={bookedDates}
        //                     minDate={new Date()}
        //                     style={{cursor: 'pointer'}}
        //                     customInput={<CustomInput2 />}
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //         <button
        //             onClick={updateBookingHandler}
        //             style={{marginLeft: '12rem', marginTop: '4rem', padding: '1rem', fontSize: '20px', cursor: 'pointer', borderRadius: '20px', fontWeight: 'bold', boxShadow: '5px 10px'}}
        //         >Update your booking</button>
        //         <div className='create-booking-column-container-right-column'>

        //         </div>
        //     </div>

        // </div>
    )
}

export default UpdateBookingModal
