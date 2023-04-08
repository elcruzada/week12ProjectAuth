import { csrfFetch } from './csrf'

const GET_ALLSPOTS = "spots/getAllSpots"

export const getAllSpotsAction = (allSpots) => ({
    type: GET_ALLSPOTS,
    allSpots
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

// const normalizationFunction = () => {

// }

const initialState = { allSpots: {}}

const spotsReducer = (state = initialState, action) => {
    let newSpotsState;
    switch(action.type) {
        case GET_ALLSPOTS:
            newSpotsState = { ...state, allSpots: {} }
            action.allSpots.Spots.forEach(spot => {
                newSpotsState.allSpots[spot.id] = spot
            })
            return newSpotsState
        default:
            return state
    }
}

export default spotsReducer
