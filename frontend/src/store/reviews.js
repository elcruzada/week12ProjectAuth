import { csrfFetch } from './csrf'

const GET_ALLREVIEWS = "reviews/GET_ALLREVIEWS"

export const getAllReviewsAction = (allReviews) => ({
    type: GET_ALLREVIEWS,
    allReviews
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
        default:
            return state
    }
}

export default reviewsReducer
