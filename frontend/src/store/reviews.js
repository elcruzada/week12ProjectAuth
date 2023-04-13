import { csrfFetch } from './csrf'

const GET_ALLREVIEWS = "spots/getAllSpots"

export const getAllReviewsAction = (allReviews) => ({
    type: GET_ALLREVIEWS,
    allReviews
})

export const getAllReviewsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/reviews')
    // console.log(res)

    if (res.ok) {
        const spotsData = await res.json()
        dispatch(getAllSpotsAction(spotsData))
        // return spotsData
    }
}


const initialState = {
    allReviews: {},
    singleReview: {}
}
const reviewsReducer = (state = initialState, action) => {
    let newSpotsState;
    const normalizerFunction = (actionData, nestedObjInState) => {
        actionData.forEach(spot => {
            nestedObjInState[spot.id] = spot
        })
    }
    switch(action.type) {
        case GET_ALLSPOTS:
            newSpotsState = { ...state, allSpots: {} }
            normalizerFunction((action.allSpots.Spots), (newSpotsState.allSpots))
            return newSpotsState
        default:
            return state
    }
}

export default reviewsReducer
