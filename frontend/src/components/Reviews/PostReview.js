import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { postReviewThunk } from '../../store/reviews'


//need star rating
const PostReviewModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [reviewContent, setReviewContent] = useState('')
    const [starRating, setStarRating] = useState(0)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const submitHandler = async (e) => {
        e.preventDefault()
        return dispatch(postReviewThunk({
            review: reviewContent,
            stars: starRating,
            // spotId
        })).then(closeModal)
           .catch(async (res) => {
            const data = await res.json();
          if (data && data.errors) {
                setErrors(data.errors);
            }
        })
    }


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
