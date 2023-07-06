import { useModal } from '../../context/Modal'
import './CreateBooking.css'

const CreateBooking = () => {
    // const { closeModal } = useModal()

    return (
        <div className='create-booking-container'>
            <h1>Confirm your booking</h1>
        <div className='create-booking-column-container'>
            <div className='create-booking-column-container-left-column'>
            <h3>Dates</h3>
            </div>
            <div className='create-booking-column-container-right-column'>

            </div>
        </div>
            
        </div>
    )
}

export default CreateBooking
