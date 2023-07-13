

import { useEffect } from 'react'
import './DeleteBookingModal.css'
import { useDispatch } from 'react-redux'

import { useModal } from '../../context/Modal'
import { useHistory } from 'react-router-dom'
import { deleteBookingThunk, getCurrentBookingsThunk } from '../../store/bookings'

const DeleteBookingModal = ({bookingId}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const cancelBookingDeleteHandler = () => {
        closeModal()
    }

    const deleteBookingHandler = (bookingId) => {
        dispatch(deleteBookingThunk(bookingId))
        closeModal()
        dispatch(getCurrentBookingsThunk())
        history.push('/bookings/current')
    }

    return (
        <>
        <div className='modal'>
            <h1>Are you sure you want to delete this booking?</h1>

            <button
            onClick={cancelBookingDeleteHandler}
            >Cancel</button>
            <button
            onClick={() => deleteBookingHandler(bookingId)}
            >Delete</button>
        </div>
        </>
    )
}

export default DeleteBookingModal
