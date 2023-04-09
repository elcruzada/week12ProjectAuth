import { csrfFetch } from './csrf'

const GET_ALLSPOTS = "spots/getAllSpots"
const GET_SPOTSDETAILS = "spots/spotsDetails"

export const getAllSpotsAction = (allSpots) => ({
    type: GET_ALLSPOTS,
    allSpots
})

export const getSpotsDetailsAction = (spotsDetails) => ({
    type: GET_SPOTSDETAILS,
    spotsDetails
})

export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')
    // console.log(res)

    if (res.ok) {
        const spotsData = await res.json()
        dispatch(getAllSpotsAction(spotsData))
        // return spotsData
    }
}

export const getSpotsDetailsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/:spotId')

    if (res.ok) {
        const spotsDetailsData = await res.json()
        dispatch(getSpotsDetailsAction(spotsDetailsData))
    }
}

const initialState = {
    allSpots: {}
}

const spotsReducer = (state = initialState, action) => {
    let newSpotsState;
    const normalizerFunction = (actionData, nestedObjInState) => {
        actionData.forEach(spot => {
            nestedObjInState[spot.id] = spot
        })
    }
    switch(action.type) {
        case GET_ALLSPOTS:
            newSpotsState = { ...state, allSpots: {} }
            // action.allSpots.Spots.forEach(spot => {
            //     newSpotsState.allSpots[spot.id] = spot
            // })
            normalizerFunction((action.allSpots.Spots), (newSpotsState.allSpots))
            return newSpotsState
        case GET_SPOTSDETAILS:
            newSpotsState = { ...state, allSpots: {} }
            normalizerFunction((action.spotsDetails.Spots), (newSpotsState.spotsDetails))
            return newSpotsState
        default:
            return state
    }
}

export default spotsReducer
