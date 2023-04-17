// import { useHistory } from "react-router-dom"
// import { useModal } from "../../../context/Modal"
// import './ManageSpotsCard.css'
// import { useDispatch, useSelector } from "react-redux"
// import { deleteSingleSpotThunk } from "../../../store/spots"
// import { getSpotsDetailsThunk } from "../../../store/spots"

// const ManageSpotsCard = ({userSpots}) => {

//     // console.log(userSpots)
//     const history = useHistory()
//     const dispatch = useDispatch()

//     // console.log(selectedSpot)
//     const { closeModal, showModal } = useModal()

//     const clickCreateSpotHandler = () => {
//         history.push('/spots/new')
//     }

//     const clickSpotDetailPageHandler = (spotId) => {
//         history.push(`/spots/${spotId}`)
//     }

//     const deleteSpotHandler = (spotId) => {
//         showModal(
//           <div className='modal-container'>
//             <div className='modal-content'>

//             <h1>Confirm Delete</h1>
//             <p>Are you sure you want to remove this spot?</p>
//             <button
//             className='delete'
//             onClick={() => confirmDelete(spotId)}
//             >Yes (Delete Spot)</button>
//             <button
//             className='cancel'
//             onClick={closeModal}>No (Keep Spot)</button>
//             </div>
//           </div>
//         );
//     }

//     const updateSpotRedirectHandler = (spotId) => {
//         dispatch(getSpotsDetailsThunk(spotId))
//         history.push(`/spots/${spotId}/edit`)
//     }

//     const confirmDelete = (spotId) => {
//         dispatch(deleteSingleSpotThunk(spotId))
//         closeModal();
//     }

//     return (
//         <div>
//         <h1>Manage Spots</h1>
//         {/* <button onClick={clickCreateSpotHandler}>Create a New Spot</button> */}
//         {userSpots.length > 0 ?
//         userSpots.map(spot => {
//             // console.log(spot)
//             return (
//                 <div key={spot.id}>
//                     <img src={spot.previewImage}
//                     alt='location'
//                     onClick={() => clickSpotDetailPageHandler(spot.id)}
//                     />
//                     <p>{`${spot.city}, ${spot.state}`}</p>
//                     <p>{`$${spot.price}night`}</p>
//                     <p>{spot.avgRating}</p>
//                     <button onClick={() => updateSpotRedirectHandler(spot.id)}>Update</button>
//                     <button onClick={() => deleteSpotHandler(spot.id)}>Delete</button>
//                 </div>
//             )
//         })
//         :
//             <button onClick={clickCreateSpotHandler}
//             className='conditionalButton'
//             >Create a New Spot</button>
//         }
//         </div>
//     )
// }

// export default ManageSpotsCard;
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleSpotThunk } from "../../../store/spots";
import { getSpotsDetailsThunk } from "../../../store/spots";
import "./ManageSpotsCard.css";

const ManageSpotsCard = ({ userSpots }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal, showModal } = useModal();

    const clickCreateSpotHandler = () => {
        history.push("/spots/new");
    };

    const clickSpotDetailPageHandler = (spotId) => {
        history.push(`/spots/${spotId}`);
    };

    const deleteSpotHandler = (spotId) => {
        showModal(
            <div className="modal-container">
                <div className="modal-content">
                    <h1>Confirm Delete</h1>
                    <p>Are you sure you want to remove this spot?</p>
                    <button
                        className="delete"
                        onClick={() => confirmDelete(spotId)}
                    >
                        Yes (Delete Spot)
                    </button>
                    <button className="cancel" onClick={closeModal}>
                        No (Keep Spot)
                    </button>
                </div>
            </div>
        );
    };

    const updateSpotRedirectHandler = (spotId) => {
        dispatch(getSpotsDetailsThunk(spotId));
        history.push(`/spots/${spotId}/edit`);
    };

    const confirmDelete = (spotId) => {
        dispatch(deleteSingleSpotThunk(spotId));
        closeModal();
    };

    return (
        <>
            <h1 className="manage-spots-title1">Manage Spots</h1>
            <div className="manage-spots-container1">
                {userSpots.length > 0 ? (
                    userSpots.map((spot) => {
                        return (
                            <div key={spot.id} className="card-container1">
                                <div
                                    onClick={() => clickSpotDetailPageHandler(spot.id)}
                                    className="card-image-container1"
                                >
                                    <img
                                        src={spot.previewImage}
                                        alt="location"
                                        className="card-image1"
                                    />
                                </div>
                                <div className="card-details1">
                                    <div className="card-city1">{`${spot.city}, ${spot.state}`}</div>
                                    <div className="card-price1">{`$${spot.price}night`}</div>
                                    <div className="card-rating">
                                        <i className="fa-solid fa-star"></i>
                                        <span>{Number(spot.avgRating) ? spot.avgRating : "New"}</span>
                                    </div>
                                </div>
                                <div className="card-actions-wrapper1">
                                    <div className="card-actions1">
                                        <button
                                            onClick={() => updateSpotRedirectHandler(spot.id)}
                                            className="card-action1 card-update1"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteSpotHandler(spot.id)}
                                            className="card-action1 card-delete1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-spots-message">
                        <h2>You have not added any spots yet!</h2>
                        <button
                            className="manage-spots-create-button"
                            onClick={clickCreateSpotHandler}
                        >
                            Add a Spot
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
export default ManageSpotsCard;
