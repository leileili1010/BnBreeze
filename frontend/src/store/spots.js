import {csrfFetch} from './csrf';

// action type
const GET_SPOTS = '/sports/get_spots';
const GET_SPOT = '/sports/get_spot';

// action creator
const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
})

const getSpot = (spot) => ({
    type: GET_SPOT,
    spot
})

// thunk action creator
export const thunkGetSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = await res.json();
        dispatch(getSpots(spots));
        return spots;
    } else {
        const data = await res.json();
        return data;
    }
}

export const thunkGetSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spot = await res.json();
        dispatch(getSpot(spot));
        return spot;
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
        default:
            return state   
    }
 }

 export default spotReducer;
