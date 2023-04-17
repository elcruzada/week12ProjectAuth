import React, { useEffect, useState } from 'react'
import { useModal } from "../../../context/Modal"
import './SpotsDetailsCard.css'
import { deleteReviewThunk } from '../../../store/reviews'
import { useDispatch } from 'react-redux'
import PostReviewModal from '../../Reviews/PostReview'
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem'
import { useHistory } from 'react-router-dom'

// import reviewsReducer from '../../../store/reviews'

const SpotsDetailsCard = ({ singleSpot, allSpotReviews, sessionUser }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal, showModal } = useModal()
    const [reviewsUpdated, setReviewsUpdated] = useState(false)
    const reviewsUpdatedHandler = () => {
        setReviewsUpdated(true)
    }
    const [reviewsUpdated2, setReviewsUpdated2] = useState(false)


    // useEffect(() => {
    //     setReviewsUpdated2(true)

    // }, [reviewsUpdated2, singleSpot.Reviews])

    // const rerender = Object.values(allSpotReviews)
    // console.log(rerender)

    // useEffect(() => {
    //     console.log(rerender.length)
    // },[rerender.length])
    // if (Object.values(allSpotReviews).length === 0) return null
    // console.log('spotsDetails', spotsDetails)
    console.log('allSpotReviews', allSpotReviews)
    console.log('singleSpot', singleSpot)
    console.log('sessionUser', sessionUser)
    // console.log('owner', owner)
    // console.log(singleSpot)
    // const {singleSpot} = singleSpot
    //jsonstringify
    const singleSpotCopy = { ...singleSpot }
    const singleSpotUser = singleSpotCopy.Owner
    // const newUserCopy = {...singleSpotUser}
    // const allSpotReviewsCopy = {...allSpotReviews}
    // const sessionUserCopy = {...sessionUser}
    // console.log('allSpotReviewCopy', allSpotReviewsCopy)
    // console.log('singleSpotCopy', singleSpotCopy)
    // console.log('sessionUser', sessionUserCopy)
    // console.log(Object.values(allSpotReviews).every(review => review.userId !== sessionUser.id))
    // const singleSpotCopy.Reviews.length
    //do 20 - 23 later on
    // console.log(Object.values(sessionUserCopy).length > 0)
    // console.log(allSpotReviews)
    const convertedAllSpotReviews = Object.values(allSpotReviews)
    // console.log(convertedAllSpotReviews)
    if (!convertedAllSpotReviews) return null
    const sortedReviews = convertedAllSpotReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const foundReview = convertedAllSpotReviews.forEach(review => {
        if (review && review.userId && sessionUser && sessionUser.id && review.userId === sessionUser.id) {
            return review
        }
    })
    // console.log(foundReview)
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
            <div className="modal-container">
                <div className="modal-content">
                    <h1>Confirm Delete</h1>
                    <p>Are you sure you want to delete this review?</p>
                    <button
                        className="delete"
                        onClick={() => confirmDelete(reviewId)}
                    >
                        Yes (Delete Review)
                    </button>
                    <br />
                    <button className="cancel" onClick={closeModal}>
                        No (Keep Review)
                    </button>
                </div>
            </div>
        );

    }

    return (
        <>
            <h1>{singleSpot.name}</h1>
                <p>
                    {`${singleSpot?.city}, ${singleSpot?.state}, ${singleSpot?.country}`}
                </p>

        <div className='spots-details-container'>
            <div className='spot-details-images-container'>
                {singleSpot.SpotImages && singleSpot.SpotImages.map(spotImage => {
                    return (
                        <img src={spotImage.url}
                            alt='location'
                            key={spotImage.url}
                            className='spot-details-preview-image'
                        />
                    )
                })}
                <div className='placeholder-images-container'>
                    <div className='placeholder-images'>
                        <img src='https://digitalcommons.georgiasouthern.edu/jesuit-gallery205/1000/preview.jpg' alt='images-soon' className='images-soon'/>
                        <img src='https://digitalcommons.georgiasouthern.edu/jesuit-gallery205/1000/preview.jpg' alt='images-soon'className='images-soon'/>
                    </div>
                    <div className='placeholder-images'>
                        <img src='https://digitalcommons.georgiasouthern.edu/jesuit-gallery205/1000/preview.jpg' alt='images-soon'className='images-soon'/>
                        <img src='https://digitalcommons.georgiasouthern.edu/jesuit-gallery205/1000/preview.jpg' alt='images-soon'className='images-soon'/>
                    </div>
                </div>
            </div>
            <div className='div-two-columns-below-image'>

                <div className='column-details-page1'>
                    {singleSpotUser?.firstName &&
                        singleSpotUser?.lastName &&
                        <h2>
                            {`Hosted by: ${singleSpotUser.firstName}, ${singleSpotUser.lastName}`}
                        </h2>
                    }
                    <div>
                        {
                            singleSpot?.description &&
                            <p>
                                {singleSpot.description}
                            </p>
                        }
                    </div>
                </div>
                <div className='column-details-page2'>
                    <div className='outerBorder-ratings-container'>
                        <div className='inner-border-ratings-container'>

                            <div className='left-margin-reserve-box'>

                            <h2>{`$${singleSpot.price} / night`}</h2>

                            </div>

                            <div className='right-margin-reserve-box'>
                            <i className="fa fa-star"></i>

                            <h3>{singleSpot.avgStarRating}</h3>

                            {singleSpot.Reviews && singleSpot.Reviews.length > 0 && <h1>·</h1>}
                            {singleSpot.Reviews && singleSpot.Reviews.length === 1 && <h3>1 Review</h3>}
                            {singleSpot.Reviews && singleSpot.Reviews.length === 0 && <h3>New</h3>}
                            {singleSpot.Reviews && singleSpot.Reviews.length > 1 && <h3>{`${singleSpot.Reviews.length} Reviews`}</h3>}
                            </div>

                        </div>
                        <button onClick={() => alert('Feature coming soon')}
                        className='reserve-button'
                        >Reserve</button>
                    </div>
                </div>
            </div>
                <hr style={{ color: 'black', backgroundColor: 'black', height: 1 }} />
                <div className='details-ratings-container'>

                    <i className="fa fa-star"></i>

                    <h2>{singleSpot.avgStarRating}</h2>

                    {singleSpot.Reviews && singleSpot.Reviews.length > 0 && <h2>·</h2>}
                    {singleSpot.Reviews && singleSpot.Reviews.length === 1 && <h2>1 Review</h2>}
                    {singleSpot.Reviews && singleSpot.Reviews.length === 0 && <h2>New</h2>}
                    {singleSpot.Reviews && singleSpot.Reviews.length > 1 && <h2>{`${singleSpot.Reviews.length} Reviews`}</h2>}
                </div>
            {/* {singleSpot.Reviews && singleSpot.Reviews.length === 0 && <i className="fa-solid fa-period"></i>} */}

            {
                sessionUser &&
                Object.values(sessionUser).length > 0 &&
                sessionUser.id !== singleSpot.ownerId &&

                !foundReview &&
                // Object.keys(foundReview).length === 1 &&
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
                    sessionUser &&
                    convertedAllSpotReviews &&
                    Object.values(sessionUser).length > 0 &&
                    sessionUser?.id !== singleSpot.ownerId &&
                    <h3>Be the first to review!</h3>}
                <ul>
                    {Object.values(allSpotReviews).length > 0 &&
                        sortedReviews.map(review => {
                            const date = new Date(review.createdAt);
                            const formattedDate = date.toLocaleString("en-US", {
                                month: "long",
                                year: "numeric",
                            });
                            return (
                                review &&
                                review.User &&
                                review?.id &&
                                sessionUser &&
                                sessionUser?.id &&
                                <div key={review.id}>
                                    <li>
                                        {review.User.firstName && <h3>{review.User.firstName}</h3>}
                                        {review.review && <p>{review.review}</p>}
                                        {review.createdAt && <p>{formattedDate}</p>}
                                        {sessionUser.id === review.userId &&

                                            <button
                                                className='spots-details-delete-button'
                                                onClick={() => deleteReviewHandler(review.id)}
                                            >Delete</button>

                                        }
                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
        </>

    )
}

export default SpotsDetailsCard
