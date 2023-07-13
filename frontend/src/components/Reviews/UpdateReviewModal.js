import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { editReviewThunk, getAllReviewsThunk } from "../../store/reviews"
import StarRating from "../UI/Rating/StarRating"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"

const UpdateReviewModal = ({ singleSpot, reviewId }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    // const reviewToUpdate = useSelector(state => state.reviews.allReviews[reviewId])
    // console.log('REEVIEW', reviewToUpdate)
    const { closeModal } = useModal()
    const [reviewContent, setReviewContent] = useState('')
    const [starRating, setStarRating] = useState(0)
    const [ errors, setErrors ] = useState({})

    const submitHandler = async (e) => {
        e.preventDefault()
        const userInput = {
            review: reviewContent,
            stars: starRating
        }

        await dispatch(editReviewThunk(reviewId, userInput)).then(() => {
            closeModal()
        }).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                setErrors(data.errors)
            }
        })



        history.push('/spots')
        history.push(`/spots/${singleSpot.id}`)
    }

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

export default UpdateReviewModal
