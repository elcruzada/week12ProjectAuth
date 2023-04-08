const GET_ALLSPOTS = "spots/getAllSpots"

export const getAllSpotsAction = (spots) => ({
    type: GET_ALLSPOTS,
    spots
})

export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await fetch('/api/spots')

    if (res.ok) {
        const spots = await res.json()
        console.log(spots)
        dispatch(getAllSpotsAction(spots))
    }
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newSpotsState;
    switch(action.type) {
        case GET_ALLSPOTS:
            newSpotsState = { ...state }
            return newSpotsState
        default:
            return state
    }
}

export default spotsReducer
