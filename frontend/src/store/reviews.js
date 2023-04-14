import { csrfFetch } from './csrf'

const GET_ALLREVIEWS = "reviews/GET_ALLREVIEWS"
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

export const getAllReviewsAction = (allReviews) => ({
    type: GET_ALLREVIEWS,
    allReviews
})

export const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    // console.log(res)

    if (res.ok) {
        const reviewsData = await res.json()
        dispatch(getAllReviewsAction(reviewsData))
        return reviewsData
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
        const reviewsData = await res.json()
        dispatch(deleteReviewAction(reviewId))
        return reviewsData
    }
}

const initialState = {
    spot: {}
}

const reviewsReducer = (state = initialState, action) => {
    let newReviewsState;
    const normalizerFunction = (actionData, nestedObjInState) => {
        actionData.forEach(review => {
            nestedObjInState[review.id] = review
        })
    }
    switch(action.type) {
        case GET_ALLREVIEWS:
            newReviewsState = { ...state, spot: {} }
            // console.log(newReviewsState)
            normalizerFunction((action.allReviews.Reviews), (newReviewsState.spot))
            return newReviewsState
        case DELETE_REVIEW:
            newReviewsState = {...state, spot: {...state.spot}}
            delete newReviewsState.spot[action.reviewId]
            return newReviewsState
        default:
            return state
    }
}

export default reviewsReducer
