import { csrfFetch } from './csrf'

const GET_ALLSPOTS = "spots/getAllSpots"
const GET_SPOTSDETAILS = "spots/spotsDetails"
const CREATE_NEWSPOT = "spots/CREATE_NEWSPOT"
const EDIT_SPOT = "spots/EDIT_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"
const SESSION_SPOTS = "spots/SESSION_SPOTS"

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

export const sessionUserSpotsAction = (spots) => ({
    type: SESSION_SPOTS,
    payload: spots
})

export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await fetch('/api/spots')
    // console.log(res)

    if (res.ok) {
        const spotsData = await res.json()
        dispatch(getAllSpotsAction(spotsData))
        // return spotsData
    }
}

export const getSpotsDetailsThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotsDetailsData = await res.json()
        dispatch(getSpotsDetailsAction(spotsDetailsData))
    }
}

export const createSpotsThunk = (userInput) => async (dispatch) => {
    const { ownerId, address, city, state, country, name, description, price, lat, lng, spotImages } = userInput
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ownerId,
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lat,
            lng,
            spotImages
        })
    })

    if (res.ok) {
        const spotData = await res.json()
        await csrfFetch(`/api/spots/${spotData.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(spotImages)
        })
        dispatch(createNewSpotAction(spotData))
        return spotData
    }
}

// export const editSingleSpotThunk = (spot) => async (dispatch) => {
//     const {spotId, address, city, state, country, lat, lng, name, description, price, previewImage} = spot;
//     const res = await csrfFetch(`/api/spots/${spotId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         spotId,
//         country,
//         address,
//         city,
//         state,
//         description,
//         lat,
//         lng,
//         name,
//         price,
//         previewImage
//       })
//     });

//     if (res.ok) {
//       const editsData = await res.json();
//       console.log(editsData)
//       await csrfFetch(`/api/spots/${editsData.id}/images`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(editsData)
//     })
//       dispatch(editSingleSpotAction(editsData));
//       return editsData;
//     }
// }
export const editSingleSpotThunk = (spotEdits, spotId) => async (dispatch) => {
    const {country, address, city, state, description,
        name, price, lat, lng } = spotEdits

    const res =  await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({country, address, city,
        state, description, name, price, lat, lng })
    });

    if (res.ok) {
      const updatedSpot = await res.json();
    //   console.log('updated', updatedSpot)

    //   const val = await csrfFetch(`/api/spots/${updatedSpot.id}/images`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(updatedSpot)
    //   });

    //   const valJson = await val.json();
    //   console.log('val', valJson)

      dispatch(editSingleSpotAction(updatedSpot));
      return updatedSpot;
    }
  };
// export const editSingleSpotThunk = (spotEdits, spotId) => async (dispatch) => {
//     const {country, address, city, state, description, name, price, spotImages, lat, lng } = spotEdits

//     const res =  await csrfFetch(`/api/spots/${spotId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({country, address, city, state, description, name, price, spotImages, lat, lng })
//     });

//     if (res.ok) {
//       const updatedSpot = await res.json();
//       console.log('updated', updatedSpot)
//      const val = await csrfFetch(`/api/spots/${updatedSpot.id}/images`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatedSpot)
//       });
//       console.log('val', val)
//       dispatch(editSingleSpotAction(updatedSpot));
//       return updatedSpot;
//     }
//   };
// export const editSingleSpotThunk = (spot) => async (dispatch) => {
//     const {spotId, address, city, state, country, lat, lng, name, description, price, previewImage} = spot
//     const res = await csrfFetch(`/api/spots/${spotId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             country,
//             address,
//             city,
//             state,
//             description,
//             lat,
//             lng,
//             name,
//             price,
//             previewImage
//         })
//     })

//     if (res.ok) {
//         const editsData = await res.json()


//         dispatch(editSingleSpotAction(editsData))
//         return editsData
//     }
// }

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

export const sessionSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
    // console.log(res)
    if (res.ok) {
       const sessionSpots = await res.json()
    //    console.log(sessionSpots)
    if (sessionSpots.ok) {
        const foundSpot = sessionSpots.find(spot => spot.id === spotId)
        dispatch(sessionUserSpotsAction(foundSpot))
        // return foundSpot
    }
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}




const spotsReducer = (state = initialState, action) => {
    const normalizerFunction = (actionData, nestedObjInState) => {
        actionData.forEach(spot => {
            nestedObjInState[spot.id] = spot
        })
    }
    let newSpotsState;
    switch(action.type) {
        case GET_ALLSPOTS:
            newSpotsState = { ...state, allSpots: {} }
            // console.log(action.allSpots)
            normalizerFunction((action.allSpots.Spots), (newSpotsState.allSpots))
            return newSpotsState
        case GET_SPOTSDETAILS:
            newSpotsState = { ...state, singleSpot: action.spotsDetails };
            return newSpotsState;
        case SESSION_SPOTS:
            newSpotsState = {...state, singleSpot: action.payload}
            return newSpotsState
        case CREATE_NEWSPOT:
            newSpotsState = { ...state, singleSpot: { ...state.singleSpot } }
            // newSpotsState.allSpots[action.userInput.id] = action.userInput
            newSpotsState.singleSpot = action.userInput
            return newSpotsState
        case EDIT_SPOT:
            newSpotsState = { ...state, singleSpot: { ...state.singleSpot } };
            newSpotsState.singleSpot[action.userInput.id] = action.userInput;
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
