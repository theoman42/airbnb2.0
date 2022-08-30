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
  console.log("hi");

  if (res.ok) {
    const allSpots = await res.json();
    dispatch(load(allSpots));
  }
};

const spotReducer = (state = {}.action) => {
  let newState;
  switch (action.type) {
    case ADD_SPOT:
      return newState;
    case EDIT_SPOT:
      return newState;
    case DELETE_SPOT:
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
