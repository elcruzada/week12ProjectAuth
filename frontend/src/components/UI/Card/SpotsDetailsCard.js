import React, { useEffect, useState } from 'react'
import { useModal } from "../../../context/Modal"
import './SpotsDetailsCard.css'
import { deleteReviewThunk } from '../../../store/reviews'
import { useDispatch } from 'react-redux'
import PostReviewModal from '../../Reviews/PostReview'
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem'
import { useHistory } from 'react-router-dom'

// import reviewsReducer from '../../../store/reviews'

const SpotsDetailsCard = ({singleSpot, allSpotReviews, sessionUser}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal, showModal } = useModal()
    const [reviewsUpdated, setReviewsUpdated] = useState(false)
    const reviewsUpdatedHandler = () => {
        setReviewsUpdated(true)
    }
    const [reviewsUpdated2, setReviewsUpdated2] = useState(false)

    useEffect(() => {
        setReviewsUpdated2(true)

    }, [reviewsUpdated2, singleSpot.Reviews])

    const rerender = Object.values(allSpotReviews)
    console.log(rerender)

    useEffect(() => {
        console.log(rerender.length)
    },[rerender.length])
    // console.log('spotsDetails', spotsDetails)
    console.log('allSpotReviews', allSpotReviews)
    console.log('singleSpot', singleSpot)
    console.log('sessionUser', sessionUser)
    // console.log('owner', owner)
    // console.log(singleSpot)
    // const {singleSpot} = singleSpot
    //jsonstringify
    const singleSpotCopy = {...singleSpot}
    const singleSpotUser = singleSpotCopy.User
    const newUserCopy = {...singleSpotUser}
    const allSpotReviewsCopy = {...allSpotReviews}
    const sessionUserCopy = {...sessionUser}
    // console.log('allSpotReviewCopy', allSpotReviewsCopy)
    // console.log('singleSpotCopy', singleSpotCopy)
    // console.log('sessionUser', sessionUserCopy)
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

    const confirmDelete = async (reviewId) => {
        await dispatch(deleteReviewThunk(reviewId)).then(() => {
            closeModal()
        })
        history.push(`/spots`);
        history.push(`/spots/${singleSpot.id}`)
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
             <h1>{singleSpot.name}</h1>
             <div>
             {singleSpot.SpotImages && singleSpot.SpotImages.map(spotImage => {
                return (
                <img src={spotImage.url} alt='location' key={spotImage.url}/>
                )
            })}
             </div>
            <p>
            {`${singleSpot.city}, ${singleSpot.state}, ${singleSpot.country}`}
            </p>
            <div>
            {singleSpot.Reviews && singleSpot.Reviews.length === 0 && <i className="fa-solid fa-period"></i>}
            {singleSpot.Reviews && singleSpot.Reviews.length === 1 && <p>1 Review</p>}
            {singleSpot.Reviews && singleSpot.Reviews.length > 1 && <p>{`${singleSpot.Reviews.length} Reviews`}</p>}
            </div>
            {singleSpotUser?.firstName &&
             singleSpotUser?.lastName &&
            <p>
                {`Hosted by: ${singleSpotUser.firstName}, ${singleSpotUser.lastName}`}
            </p>
            }
            <p>
                {singleSpot.description}
            </p>
            <p>{`$${singleSpot.price}night`}</p>
            <div>
            {singleSpot.Reviews && singleSpot.Reviews.length === 0 && <i className="fa-solid fa-period"></i>}
            {singleSpot.Reviews && singleSpot.Reviews.length === 1 && <h2>1 Review</h2>}
            {singleSpot.Reviews && singleSpot.Reviews.length > 1 && <h2>{`${singleSpot.Reviews.length} Reviews`}</h2>}
            </div>
            {
            Object.values(sessionUser).length > 0 &&
            sessionUser.id !== singleSpot.ownerId &&
            singleSpot.Reviews &&
            <div className='post-review-container'>

                <OpenModalMenuItem
                    itemText={
                    <button className='post-review-container'
                    >Post your review</button>
                }
                    modalComponent={<PostReviewModal
                        singleSpot={singleSpot}
                        reviewsUpdatedHandler={reviewsUpdatedHandler}
                        allSpotReviews={allSpotReviews}
                        />}
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
            {Object.values(allSpotReviews).length === 0 &&
                Object.values(sessionUser).length > 0  &&
                sessionUser.id !== singleSpot.ownerId  &&
                <h3>Be the first to review!</h3>}
            <ul>
            {Object.values(allSpotReviews).length > 0 &&
                Object.values(allSpotReviews).map(review => {

               return (
                review.User &&
                <div key={review.id}>
                <li>
                    {review.User.firstName && <h3>{review.User.firstName}</h3>}
                    {review.review && <p>{review.review}</p>}
                    {review.createdAt && <p>{review.createdAt}</p>}
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
