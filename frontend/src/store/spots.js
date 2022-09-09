import { csrfFetch } from "./csrf";

const LOAD = "spots/load";
const GET_SPOT = "spots/getSpot";
const ADD_SPOT = "spots/add";
const EDIT_SPOT = "spots/edit";
const DELETE_SPOT = "spots/delete";

export const load = (spots) => {
  return {
    type: LOAD,
    payload: spots,
  };
};

export const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    payload: spot,
  };
};

export const addNewSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
  };
};

export const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    payload: spot,
  };
};

export const deleteSpot = (id) => {
  return {
    type: DELETE_SPOT,
    payload: id,
  };
};

export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch("/spots");

  if (res.ok) {
    const allSpots = await res.json();
    dispatch(load(allSpots));
  }
};

export const getOneSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${id}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(getSpot(spot));
    return spot;
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
    dispatch(addNewSpot(spot));
    return spot;
  }
};

export const editOwnerSpot = (payload, id) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(getOneSpot(spot.id));
    return spot;
  }
};

export const deleteOwnerSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteSpot(id));
  }
};

const spotReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const spots = {};
      action.payload.spots.forEach((spot) => {
        spots[spot.id] = spot;
      });
      return { ...spots };
    case GET_SPOT:
      const newState = {};
      newState.currentSpot = action.payload;
      return newState;
    case ADD_SPOT:
      const addSpot = {};
      addSpot.currentSpot = action.payload;
      return addSpot;
    case EDIT_SPOT:
      const newEditState = { ...state };
      newEditState[action.payload.id] = action.payload;
      return newEditState;
    case DELETE_SPOT:
      const newDeleteState = { ...state };
      delete newDeleteState[action.payload];
      return newDeleteState;
    default:
      return state;
  }
};

export default spotReducer;
