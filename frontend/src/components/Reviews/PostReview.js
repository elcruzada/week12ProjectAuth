import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { postReviewThunk } from '../../store/reviews'


//need star rating
const PostReviewModal = ({singleSpot, reviewsUpdatedHandler, allSpotReviews}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const [reviewSubmitted, setReviewSubmitted] = useState(false)
    // const [trigger, setTrigger] = useState(false)
    const a = useSelector(state => state.session.user)
    const [submitted, setHasSubmitted] = useState(false)
    // const reviewLength = Object.values(reviews).length
    const [reviewContent, setReviewContent] = useState('')
    const [starRating, setStarRating] = useState(1)
    const [errors, setErrors] = useState({})
    const [rerender, setRerender] = useState(0)
    const { closeModal } = useModal()
    console.log('ssiiignle', singleSpot)
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
        //   setTrigger(!trigger)
        // setRerender(rerender + 1)

    }

    useEffect(() => {
        // setSingleSpotCopy(singleSpot);
        console.log(allSpotReviews)
        // postReviewThunk()
    }, [setHasSubmitted, allSpotReviews])
    return (
        <div>
        <form
            className="post-review-modal-container"
            onSubmit={submitHandler}
        >

        <h1>How was your stay?</h1>
        <textarea
          id='postReviewModal'
          type='text'
          placeholder='Leave your review here...'
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
        <p>Stars</p>

        <button
        disabled={reviewContent.length < 10 ? true : false}
        >Submit Your Review</button>
        </form>
      </div>
    )

}

export default PostReviewModal
