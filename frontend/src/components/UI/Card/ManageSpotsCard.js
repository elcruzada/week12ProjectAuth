import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"
import './ManageSpotsCard.css'
import { useDispatch } from "react-redux"
import { deleteSingleSpotThunk } from "../../../store/spots"

const ManageSpotsCard = ({userSpots}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal, showModal } = useModal()

    const clickCreateSpotHandler = () => {
        history.push('/spots/new')
    }

    const clickSpotDetailPageHandler = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    const deleteSpotHandler = (spotId) => {
        showModal(
          <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot?</p>
            <button
            className='delete'
            onClick={() => confirmDelete(spotId)}
            >Yes (Delete Spot)</button>
            <button
            className='cancel'
            onClick={closeModal}>No (Keep Spot)</button>
          </div>
        );
    }

    const confirmDelete = (spotId) => {
        dispatch(deleteSingleSpotThunk(spotId))
        closeModal();
    }

    return (
        <div>
        <h1>Manage Spots</h1>
        <button onClick={clickCreateSpotHandler}>Create a New Spot</button>
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
                    <button onClick={() => deleteSpotHandler(spot.id)}>Delete</button>
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
