import { csrfFetch } from './csrf'

const GET_ALLSPOTS = "spots/getAllSpots"
const GET_SPOTSDETAILS = "spots/spotsDetails"
const CREATE_NEWSPOT = "spots/CREATE_NEWSPOT"

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
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
    })

    if (res.ok) {
        const spotData = await res.json()
        dispatch(createNewSpotAction(spotData))
        return spotData
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
            // action.allSpots.Spots.forEach(spot => {
            //     newSpotsState.allSpots[spot.id] = spot
            // })
            normalizerFunction((action.allSpots.Spots), (newSpotsState.allSpots))
            return newSpotsState
        case GET_SPOTSDETAILS:
            newSpotsState = { ...state, allSpots: {}}
            newSpotsState.allSpots = action.spotsDetails
            return newSpotsState
        case CREATE_NEWSPOT:
            newSpotsState = { ...state, allSpots: { ...state.allSpots } }
            newSpotsState.allSpots[action.userInput.id] = action.userInput
            return newSpotsState
        default:
            return state
    }
}

export default spotsReducer
