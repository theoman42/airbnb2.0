import { csrfFetch } from "./csrf";

const LOAD = "reviews/load";
const DELETE_REVIEW = "reviews/delete";

export const load = (reviews) => {
  return {
    type: LOAD,
    payload: reviews,
  };
};

export const deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    payload: review,
  };
};

export const getReviewsfromSpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}/reviews`);

  if (res.ok) {
    const allReviews = await res.json();
    dispatch(load(allReviews));
    return;
  }
};

export const addReview = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    dispatch(getReviewsfromSpotId(spotId));
    return;
  }
};

export const updateReview = (review, spotId, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    dispatch(getReviewsfromSpotId(spotId));
    return;
  }
};

export const deleteOneReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteReview(reviewId));
    return;
  }
};

const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const reviews = {};
      action.payload.reviews.forEach((review) => {
        reviews[review.id] = review;
      });
      return { ...reviews };
    case DELETE_REVIEW:
      const deleteReviews = { ...state };
      delete deleteReviews[action.payload];
      return deleteReviews;
    default:
      return state;
  }
};

export default reviewReducer;
