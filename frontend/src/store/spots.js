import { csrfFetch } from "./csrf";

const LOAD = "spots/load";
const ADD_SPOT = "spots/add";
const EDIT_SPOT = "spots/edit";
const DELETE_SPOT = "spots/delete";

export const load = (spots) => {
  return {
    type: LOAD,
    payload: spots,
  };
};

export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch("/spots");

  if (res.ok) {
    const allSpots = await res.json();
    dispatch(load(allSpots));
  }
};

const spotReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const spots = {};
      action.payload.spots.forEach((spot) => {
        spots[spot.id] = spot;
      });
      return { ...state, ...spots };
    case ADD_SPOT:
      return state;
    case EDIT_SPOT:
      return state;
    case DELETE_SPOT:
      return state;
    default:
      return state;
  }
};

export default spotReducer;
