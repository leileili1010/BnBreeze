import {csrfFetch} from './csrf';

// action type
const GET_SPOTS = '/spots/get_spots';
const GET_SPOT = '/spots/get_spot';
const ADD_SPOT = '/spots/add_spot';
const ADD_IMG = '/spots/add_img';
const DELETE_SPOT = '/spots/delete_spot';
// const EDIT_IMG = '/spots/edit_img';

// action creator
const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
})

const getSpot = (spot) => ({
    type: GET_SPOT,
    spot
})

const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})

const addImage = (spotId, image) => ({
    type: ADD_IMG,
    spotId, image
})

const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

// const editImage = (spotId, image) => ({
//     type: EDIT_IMG,
//     spotId, image
// })


// thunk action creator
// get all spots
export const thunkGetSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = await res.json();
        dispatch(getSpots(spots));
        return spots;
    } else {
        const data = await res.json();
        console.log("this is err", data); // to be delete!!!
        return data;
    }
}

// get spot details
export const thunkGetSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spot = await res.json();
        dispatch(getSpot(spot));
        return spot;
    } 
    else {
        const data = await res.json();
        // console.log("this is err", data); // to be delete!!!
        return data;
    }
}

// add image to a spot
export const thunkCreateImage = (spotId, image) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json'},
        body: JSON.stringify(image)
    })
    if (res.ok) {
        const createdImg = await res.json();
        dispatch(addImage(spotId, createdImg));
        return createdImg;
    } else {
        const data = await res.json();
        console.log("this is err for adding image", data); // to be delete!!!
        return data;
    }
}

// create a spot
export const thunkCreateSpot = (spot) => async dispatch => {
    const res = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { "Content-Type": 'application/json'},
        body: JSON.stringify(spot)
    });
    if (res.ok) {
        const createdSpot = await res.json();
        dispatch(addSpot(createdSpot))
        return createdSpot;
    } 
    else {
        const data = await res.json();
        return data;
    }
}

// Update a spot
export const thunkUpdateSpot = (spot, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json'},
        body: JSON.stringify(spot)
    })
    if (res.ok) {
        const updatedSpot = await res.json();
        dispatch(addSpot(updatedSpot));
        return updatedSpot;
    } else {
        const data = await res.json();
        return data;
    }
}

// delete a spot
export const thunkDeleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteSpot(spotId));
        return spotId;
    } else {
        const data = await res.json();
        return data;
    }
}

// spots reducer
const initialState = {};

const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SPOTS: {
            const newState = {...state};
            action.spots.Spots.forEach(spot => newState[spot.id] = spot);
            return newState;
        }
        case GET_SPOT: {
            return {...state, [action.spot.id]: action.spot}
        }
        case ADD_SPOT: {
            if (!state[action.spot.id]) {
              const newState = {...state, [action.spot.id]: action.spot};
              return newState;
            }
            return { ...state, [action.spot.id]: {...state[action.spot.id], ...action.spot}};
         }
         case ADD_IMG: {
            const newState = {...state}
            if (!newState[action.spotId].SpotImages) {
                newState[action.spotId].SpotImages = [];
                newState[action.spotId].SpotImages.push(action.image);
                return newState;
            } else {
                newState[action.spotId].SpotImages.push(action.image);
                return newState;
            }
        }
        case DELETE_SPOT: {
            const newState = {...state}
            delete newState[action.spotId]
            return newState
        }
        // case EDIT_IMG: {
        //     const newState = {...state};
        //     newState[action.spotId].SpotImages[action.image.id] = image;
        //     return newState;
        // }
            // if (!state[action.spotId].SpotImages.length) {
            //     const newState = {...state, [state[action.spotId]]: { ...state[action.spotId], SpotImages: 
            //             {[action.image.id]: action.image}
            //         }
            //     }
            //     return newState
            // }
            // return {...state, [state[action.spotId]]: {...state[action.spotId],
            //        [state[action.spotId].SpotImages]: {...state[action.spotId].SpotImages, 
            //             [action.image.id]: action.image
            //        }
            //     }
            
        default:
            return state   
    }
 }

 export default spotReducer;
