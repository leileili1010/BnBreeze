import {csrfFetch} from './csrf';

// action type
const GET_REVIEWS = '/reviews/get_reviews';
const ADD_REVIEW = '/reviews/add_review';

// action creator
const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})

// thunk action creator
// get all reviews for a spot based on spotId
export const thunkGetReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(getReviews(reviews))
        return reviews;
    } else {
        const data = await res.json;
        return data;
    }
}

// create a review for a spot
export const thunkCreateReview = (review, spotId, sessionUser) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const newReview = await res.json();
        newReview.User=sessionUser;
        dispatch(addReview(newReview));
        return newReview;
    } else {
        const data = await res.json;
        return data;
    }
}


const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = {};
            action.reviews.Reviews.forEach(review => newState[review.id] = review)
            return newState;
        }
        case ADD_REVIEW: {
            return {...state, [action.review.id]: action.review};
        }
        default:
            return state;
    }
}

export default reviewReducer;