import {csrfFetch} from './csrf';

// action type
const GET_SPOTS = '/sports/get_sports';

// action creator
const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
})

// thunk action creator
export const thunkGetSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = await res.json();
        dispatch(getSpots(spots));
        return spots;
    }
}

export const thunkGetSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    
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
        default:
            return state   
    }
 }

 export default spotReducer;
