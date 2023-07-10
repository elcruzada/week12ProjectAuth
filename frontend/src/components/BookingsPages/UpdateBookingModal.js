import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import './CreateBooking.css'
import { createBookingThunk, editBookingThunk } from '../../store/bookings'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const UpdateBookingModal = ({ bookingId }) => {
    const { closeModal } = useModal()
    // const { bookingId } = useParams()
    const bookingToUpdate = useSelector(state => Object.values(state.bookings?.allBookings)[bookingId])
    // console.log('BOOOKING', bookingToUpdate)
    const dispatch = useDispatch()
    const history = useHistory()
    const [checkin, setCheckin] = useState('')
    const [checkout, setCheckout] = useState('')
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        setCheckin(bookingToUpdate?.startDate)
        setCheckout(bookingToUpdate?.endDate)
    }, [bookingToUpdate])

    useEffect(() => {
        console.log('RRROZZZ', formErrors)
    }, [formErrors])

    const updateBookingHandler = async () => {

        const errors = {}
        if (!checkin) errors.checkin = "Start date is required"
        if (!checkout) errors.checkout = "End date is required"




        if (Object.values(errors).length === 0) {

            const bookingInput = {
                startDate: checkin,
                endDate: checkout
            }

            // console.log('DISPATCHED', dispatchedCheckIn)
            //     if (dispatchedCheckIn) {
            //         setFormErrors(dispatchedCheckIn);
            //         history.push('/bookings/current')

            //         closeModal()
            //     } else {
            //         setFormErrors(dispatchedCheckIn);

            //     }
            // } else {
            //     setFormErrors(errors);
            // }
            //     const dispatchedCheckIn = await dispatch(editBookingThunk(bookingInput, bookingId))
            //     console.log('DIIIISPATCHED', dispatchedCheckIn)
            //     if (dispatchedCheckIn?.errors) {
            //         console.log('DIIIISPATCHED', dispatchedCheckIn)
            //         setFormErrors(dispatchedCheckIn.errors);
            //     } else {
            //         history.push('/bookings/current')
            //         closeModal()
            //     }
            // } else {
            //     setFormErrors(errors);
            // }
            //     try {
            //         await dispatch(editBookingThunk(bookingInput, bookingId))
            //         history.push('/bookings/current')
            //         closeModal()
            //     } catch (err) {
            //         console.error('EEERROR', err)
            //         setFormErrors({ api: err.message });
            //     }
            // } else {
            //     setFormErrors(errors);
            // }
            //     try {
            //         const dispatchedCheckIn = await dispatch(editBookingThunk(bookingInput, bookingId))

            //         if (dispatchedCheckIn?.statusCode === 200) {
            //             history.push('/bookings/current')
            //             closeModal()
            //         } else {
            //             // We are assuming here that the server will always return an object with 'errors' property
            //             setFormErrors(dispatchedCheckIn.errors || { api: dispatchedCheckIn.message });
            //         }
            //     } catch (err) {
            //         console.error('Error in updateBookingHandler:', err);
            //         setFormErrors({ api: 'An error occurred while trying to update the booking. Please try again.' });
            //     }
            // } else {
            //     setFormErrors(errors);
            // }


            const result = await dispatch(editBookingThunk(bookingInput, bookingId));
            if (!result.ok) {
                    console.log('RESSSULT', formErrors)
                    setFormErrors(result);
                } else {
                    history.push('/bookings/current');
                    closeModal();
                }

        }
    }

    return (
        <div className='create-booking-container'>
            <h1>Booking details</h1>
            <p>{formErrors.errors && formErrors.errors}</p>
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
                            <input type='date'
                                value={checkin}
                                onChange={(e) => setCheckin(e.target.value)}
                            >
                            </input>
                        </div>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            CHECKOUT
                            <input type='date'
                                value={checkout}
                                onChange={(e) => setCheckout(e.target.value)}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <button
                    onClick={updateBookingHandler}
                >Update your booking</button>
                <div className='create-booking-column-container-right-column'>

                </div>
            </div>

        </div>
    )
}

export default UpdateBookingModal
