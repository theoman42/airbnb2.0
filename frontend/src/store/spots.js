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

export const addNewSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
  };
};

export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch("/spots");

  if (res.ok) {
    const allSpots = await res.json();
    dispatch(load(allSpots));
  }
};

export const addSpot = (payload) => async (dispatch) => {
  const res = await csrfFetch("/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const spot = await res.json();
    console.log(spot);
    dispatch(addNewSpot(spot));
    return spot;
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
      state[action.payload.id] = action.payload;
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
