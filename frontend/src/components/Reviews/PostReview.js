import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { postReviewThunk } from '../../store/reviews'
import StarRating from '../UI/Rating/StarRating'
import './PostReview.css'


//need star rating
const PostReviewModal = ({ singleSpot, reviewsUpdatedHandler, allSpotReviews }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  // const [reviewSubmitted, setReviewSubmitted] = useState(false)
  // const [trigger, setTrigger] = useState(false)
  // const a = useSelector(state => state.session.user)
  // const [submitted, setHasSubmitted] = useState(false)
  // const reviewLength = Object.values(reviews).length
  const [reviewContent, setReviewContent] = useState('')
  const [starRating, setStarRating] = useState(0)
  const [errors, setErrors] = useState({})
  // const [rerender, setRerender] = useState(0)
  const { closeModal } = useModal()
  // console.log('ssiiignle', singleSpot)
  // const [showEditForm, setShowEditForm] = useState(false);
  // const [singleSpotCopy, setSingleSpotCopy] = useState(singleSpot)


  // useEffect(() => {
  //   console.log('reviews', reviewLength)
  // },[reviewLength])


  const submitHandler = async (e) => {
    e.preventDefault()
    await dispatch(postReviewThunk({
      review: reviewContent,
      stars: starRating,
      spotId: singleSpot.id
    })).then(() => {
      closeModal();
      reviewsUpdatedHandler();
    }).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });

    history.push(`/spots`);
    history.push(`/spots/${singleSpot.id}`);

  }

  // useEffect(() => {
  //     // setSingleSpotCopy(singleSpot);
  //     console.log(allSpotReviews)
  //     // postReviewThunk()
  // }, [setHasSubmitted, allSpotReviews])
  return (
    <div>
      <form
        className="post-review-modal-container"
        onSubmit={submitHandler}
      >

        <h1 className='how-stay'>How was your stay?</h1>
        <textarea
          className="reviewModalText"
          id='postReviewModal'
          type='text'
          placeholder='Leave your review here...'
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
        <div className='star-rating-container'>

          <StarRating rating={starRating} disabled={false} onChange={setStarRating}
            className="star-rating"
          />
          <p>Stars</p>
        </div>
        <button
          className='post-review-modal-button'
          disabled={reviewContent.length < 10 ? true : false}
        >Submit Your Review</button>
      </form>
    </div>
  )

}

export default PostReviewModal
