import React, { useEffect, useState } from 'react'
import { useModal } from "../../../context/Modal"
import './SpotsDetailsCard.css'
import { deleteReviewThunk } from '../../../store/reviews'
import { useDispatch } from 'react-redux'
import PostReviewModal from '../../Reviews/PostReview'
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem'
// import reviewsReducer from '../../../store/reviews'

const SpotsDetailsCard = ({singleSpot, allSpotReviews, sessionUser}) => {
    const dispatch = useDispatch()
    const { closeModal, showModal } = useModal()
    // console.log('spotsDetails', spotsDetails)
    // console.log('ownerCopy', ownerCopy)
    // console.log('single', singleSpot)
    // console.log('owner', owner)
    // console.log(singleSpot)
    // const {singleSpot} = singleSpot
    //jsonstringify
    const singleSpotCopy = {...singleSpot}
    const singleSpotUser = singleSpotCopy.User
    const newUserCopy = {...singleSpotUser}
    const allSpotReviewsCopy = {...allSpotReviews}
    const sessionUserCopy = {...sessionUser}
    console.log('allSpotReviewCopy', allSpotReviewsCopy)
    console.log('singleSpotCopy', singleSpotCopy)
    console.log('sessionUser', sessionUserCopy)
    // console.log(Object.values(allSpotReviews).every(review => review.userId !== sessionUser.id))
    // const singleSpotCopy.Reviews.length
    //do 20 - 23 later on
    // console.log(Object.values(sessionUserCopy).length > 0)

    const clickHandler = () => {

        closeModal()
    }

    // useEffect(() => {
        //     console.log(textArea)
        // },[textArea])
    const [textArea, setTextArea] = useState('')

    const postReviewHandler = () => {

        showModal(
            <div>
              <h1>How was your stay?</h1>
              <textarea
                id='postReviewModal'
                type='text'
                placeholder='Leave your review here...'
                onChange={(e) => setTextArea(e.target.value)}
              />
              <p>Stars</p>

              <button
              disabled={textArea.length < 10 ? true : false}
              onClick={clickHandler}
              >Submit Your Review</button>
            </div>
          );
    }

    const confirmDelete = (reviewId) => {
        dispatch(deleteReviewThunk(reviewId))
        closeModal()
    }

    const deleteReviewHandler = (reviewId) => {

        showModal(
            <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button
            className='delete'
            onClick={() => confirmDelete(reviewId)}
            >Yes (Delete Review)</button>
            <button
            className='cancel'
            onClick={closeModal}>No (Keep Review)</button>
          </div>
          );
    }

    return (

        <div>
             <h1>{singleSpotCopy.name}</h1>
             <div>
             {singleSpotCopy.SpotImages && singleSpotCopy.SpotImages.map(spotImage => {
                return (
                <img src={spotImage.url} alt='location' key={spotImage.url}/>
                )
            })}
             </div>
            <p>
            {`${singleSpotCopy.city}, ${singleSpotCopy.state}, ${singleSpotCopy.country}`}
            </p>
            <div>
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length === 0 && <i className="fa-solid fa-period"></i>}
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length === 1 && <p>1 Review</p>}
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length > 1 && <p>{`${singleSpotCopy.Reviews.length} Reviews`}</p>}
            </div>
            <p>
                {`Hosted by: ${newUserCopy.firstName}, ${newUserCopy.lastName}`}
            </p>
            <p>
                {singleSpotCopy.description}
            </p>
            <p>{`$${singleSpotCopy.price}night`}</p>
            <div>
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length === 0 && <i className="fa-solid fa-period"></i>}
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length === 1 && <h2>1 Review</h2>}
            {singleSpotCopy.Reviews && singleSpotCopy.Reviews.length > 1 && <h2>{`${singleSpotCopy.Reviews.length} Reviews`}</h2>}
            </div>
            {
            Object.values(sessionUserCopy).length > 0 &&
            sessionUserCopy.id !== singleSpotCopy.ownerId &&
            singleSpotCopy.Reviews &&
            <div className='post-review-container'>

                <OpenModalMenuItem
                    itemText={
                    <button className='post-review-container'
                    >Post your review</button>
                }
                    modalComponent={<PostReviewModal />}
                />
            </div>
            // Object.values(allSpotReviewsCopy).length > 0 &&
            // Object.values(allSpotReviewsCopy).every(review => review.userId !== sessionUser.id) &&
            // <div className='post-revew-button-container'>
            //     <button
            //     className='post-review-button'
            //     onClick={() => postReviewHandler()}
            //     >Post Your Review</button>
            // </div>
            }

            <div className='review-list-container'>
            {Object.values(allSpotReviewsCopy).length === 0 &&
                Object.values(sessionUserCopy).length > 0  &&
                sessionUserCopy.id !== singleSpotCopy.ownerId  &&
                <h3>Be the first to review!</h3>}
            <ul>
            {Object.values(allSpotReviewsCopy).length > 0 &&
                Object.values(allSpotReviewsCopy).map(review => {
               return (
                <div key={review.id}>
                <li>
                    <h3>{review.User.firstName}</h3>
                    <p>{review.review}</p>
                    <p>{review.createdAt}</p>
                    <button
                        onClick={() => deleteReviewHandler(review.id)}
                    >Delete</button>
                </li>
                </div>
               )
            })
            }
            </ul>
            </div>
        <button onClick={() => alert('Feature coming soon')}>Reserve</button>
        </div>


    )
}

export default SpotsDetailsCard
