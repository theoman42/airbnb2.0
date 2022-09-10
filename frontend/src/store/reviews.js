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
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`).catch(async (res) => {
    dispatch(load({ reviews: [] }));
  });
  if (res) {
    const allReviews = await res.json();
    dispatch(load(allReviews));
    return allReviews;
  }
};

export const addReview = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    dispatch(getReviewsfromSpotId(spotId));
    return res.json();
  }
};

export const updateReview = (review, spotId, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    dispatch(getReviewsfromSpotId(spotId));
    return res.json();
  }
};

export const deleteOneReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteReview(reviewId));
    return res.json();
  }
};

const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const reviews = {};
      action.payload.reviews.forEach((review) => {
        reviews[review.id] = review;
      });
      return reviews;
    case DELETE_REVIEW:
      const deleteReviews = { ...state };
      delete deleteReviews[action.payload];
      return deleteReviews;
    default:
      return state;
  }
};

export default reviewReducer;
