import { csrfFetch } from "./csrf";

const LOAD = "reviews/load";
const GET_REVIEW = "reviews/getSpot";
const ADD_REVIEW = "reviews/add";
const EDIT_REVIEW = "reviews/edit";
const DELETE_REVIEW = "reviews/delete";

export const load = (reviews) => {
  return {
    type: LOAD,
    payload: reviews,
  };
};

export const getReview = (review) => {
  return {
    type: GET_REVIEW,
    payload: review,
  };
};

export const addNewSpot = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review,
  };
};

export const getReviewsfromSpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}/reviews`);

  if (res.ok) {
    const allReviews = await res.json();
    dispatch(load(allReviews));
  }
};

const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const reviews = {};
      action.payload.reviews.forEach((review) => {
        reviews[review.id] = review;
      });
      return { ...state, ...reviews };
    case GET_REVIEW:
      return state;
    case ADD_REVIEW:
      return state;
    case EDIT_REVIEW:
      return state;
    case DELETE_REVIEW:
      return state;
    default:
      return state;
  }
};

export default reviewReducer;
