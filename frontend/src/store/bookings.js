import { csrfFetch } from './csrf'

const GET_CURRENTBOOKINGS = "bookings/GET_CURRENTBOOKINGS"
const GET_SPOTBOOKINGS = "bookings/GET_SPOTBOOKINGS" //do this later
const CREATE_BOOKING = "bookings/CREATE_BOOKING"
const EDIT_BOOKING = "bookings/EDIT_BOOKING"
const DELETE_BOOKING = "bookings/DELETE_BOOKING"

export const getCurrentBookingsAction = (current) => ({
    type: GET_CURRENTBOOKINGS,
    current
})

export const getSpotBookingsAction = (spotsBookings) => ({
    type: GET_SPOTBOOKINGS,
    spotsBookings
})

export const createBookingAction = (userInput) => ({
    type: CREATE_BOOKING,
    userInput
})

export const editBookingAction = (userInput) => ({
    type: EDIT_BOOKING,
    userInput
})

export const deleteBookingAction = (spotId) => ({
    type: DELETE_BOOKING,
    spotId
})


export const getCurrentBookingsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/bookings/current')
    console.log('REES', res)

    if (res.ok) {
        const bookingsData = await res.json()
        dispatch(getCurrentBookingsAction(bookingsData))
        // return spotsData
    }
}

export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotsDetailsData = await res.json()
        dispatch(getSpotBookingsAction(spotsDetailsData))
    }
}

export const createBookingThunk = (spotId, userInput) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userInput
        })
    })

    if (res.ok) {
        const bookingData = await res.json()
        dispatch(createBookingAction(bookingData))
        return bookingData
    }
}

export const editBookingThunk = (userInput, bookingId) => async (dispatch) => {

    const res =  await csrfFetch(`/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userInput})
    });

    if (res.ok) {
      const updatedBooking = await res.json();

      dispatch(editBookingAction(updatedBooking));
      return updatedBooking;
    }
  };


export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        dispatch(deleteBookingAction(bookingId))
    }
}

const initialState = {
    allBookings: {},
    singleBooking: {}
}

const bookingsReducer = (state = initialState, action) => {
    const normalizerFunction = (actionData, nestedObjInState) => {
        actionData.forEach(spot => {
            nestedObjInState[spot.id] = spot
        })
    }
    let newBookingsState;
    switch(action.type) {
        case GET_CURRENTBOOKINGS:
            // console.log('AACCTION', action)
            newBookingsState = { ...state, allBookings: {} }
            normalizerFunction((action.current.Bookings), (newBookingsState.allBookings))
            return newBookingsState
        case GET_SPOTBOOKINGS:
            newBookingsState = { ...state, singleBooking: action.spotsBookings };
            return newBookingsState;
        case CREATE_BOOKING:
            newBookingsState = { ...state, singleBooking: { ...state.singleBooking } }
            // newSpotsState.allSpots[action.userInput.id] = action.userInput
            newBookingsState.singleBooking = action.userInput
            return newBookingsState
        case EDIT_BOOKING:
            newBookingsState = { ...state, singleBooking: { ...state.singleBooking } };
            newBookingsState.singleBooking[action.userInput.id] = action.userInput;
            return newBookingsState;
        case DELETE_BOOKING:
            newBookingsState = { ...state, allBookings: {...state.allBookings} }
            delete newBookingsState.allBookings[action.spotId]
            return newBookingsState
        default:
            return state
    }
}

export default bookingsReducer
