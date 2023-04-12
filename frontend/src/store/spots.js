import { csrfFetch } from './csrf'

const GET_ALLSPOTS = "spots/getAllSpots"
const GET_SPOTSDETAILS = "spots/spotsDetails"
const CREATE_NEWSPOT = "spots/CREATE_NEWSPOT"
const EDIT_SPOT = "spots/EDIT_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"

export const getAllSpotsAction = (allSpots) => ({
    type: GET_ALLSPOTS,
    allSpots
})

export const getSpotsDetailsAction = (spotsDetails) => ({
    type: GET_SPOTSDETAILS,
    spotsDetails
})

export const createNewSpotAction = (userInput) => ({
    type: CREATE_NEWSPOT,
    userInput
})

export const editSingleSpotAction = (userInput) => ({
    type: EDIT_SPOT,
    userInput
})

export const deleteSingleSpotAction = (spotId) => ({
    type: DELETE_SPOT,
    spotId
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

export const getSpotsDetailsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotsDetailsData = await res.json()
        dispatch(getSpotsDetailsAction(spotsDetailsData))
    }
}

export const createSpotsThunk = (userInput) => async (dispatch) => {
    const { address, city, state, country, name, description, price, lat, lng, previewImage } = userInput
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lat,
            lng,
            previewImage
        })
    })

    if (res.ok) {
        const spotData = await res.json()
        dispatch(createNewSpotAction(spotData))
        return spotData
    }
}

export const editSingleSpotThunk = (spotId, userInput) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
    })

    if (res.ok) {
        const editsData = await res.json()
        dispatch(editSingleSpotAction(editsData))
    }
}

export const deleteSingleSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        dispatch(deleteSingleSpotAction(spotId))
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
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
            normalizerFunction((action.allSpots.Spots), (newSpotsState.allSpots))
            return newSpotsState
        case GET_SPOTSDETAILS:
            newSpotsState = { ...state, singleSpot: action.spotsDetails };
            return newSpotsState;
        case CREATE_NEWSPOT:
            newSpotsState = { ...state, singleSpot: { ...state.singleSpot } }
            // newSpotsState.allSpots[action.userInput.id] = action.userInput
            newSpotsState.singleSpot = action.userInput
            return newSpotsState
        case EDIT_SPOT:
            newSpotsState = { ...state, allSpots: { ...state.allSpots } };
            newSpotsState.allSpots[action.userInput.id] = action.userInput;
            return newSpotsState;
        case DELETE_SPOT:
            newSpotsState = { ...state, allSpots: {...state.allSpots} }
            delete newSpotsState.allSpots[action.spotId]
            return newSpotsState
        default:
            return state
    }
}

export default spotsReducer
