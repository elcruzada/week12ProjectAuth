import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"
import './ManageSpotsCard.css'

const ManageSpotsCard = ({userSpots}) => {
    const history = useHistory()
    const { closeModal, showModal } = useModal()

    const clickCreateSpotHandler = () => {
        history.push('/spots/new')
    }

    const clickSpotDetailPageHandler = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    const deleteSpotHandler = () => {
        showModal(
          <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot?</p>
            <button
            className='delete'
            onClick={confirmDelete}
            >Yes (Delete Spot)</button>
            <button
            className='cancel'
            onClick={closeModal}>No (Keep Spot)</button>
          </div>
        );
    }

    const confirmDelete = () => {
        // delete the spot and close the modal
        closeModal();
    }

    return (
        <div>
        <h1>Manage Spots</h1>
        <button>Create a New Spot</button>
        {userSpots.length > 0 ?
        userSpots.map(spot => {
            // console.log(spot)
            return (
                <div key={spot.id}>
                    <img src={spot.previewImage}
                    onClick={() => clickSpotDetailPageHandler(spot.id)}
                    />
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p>{`$${spot.price}night`}</p>
                    <p>{spot.avgRating}</p>
                    <button>Update</button>
                    <button onClick={deleteSpotHandler}>Delete</button>
                </div>
            )
        })
        :
            <button onClick={clickCreateSpotHandler}>Create a New Spot</button>
        }
        </div>
    )
}

export default ManageSpotsCard;
