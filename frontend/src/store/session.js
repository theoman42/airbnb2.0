import { csrfFetch } from "./csrf";

const SET_USER = "session/set";
const RM_USER = "session/remove";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const rmUser = () => {
  return {
    type: RM_USER,
  };
};

export const login = (payload) => async (dispatch) => {
  const { email, password } = payload;
  const res = await csrfFetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data));
    return res;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/restore");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  console.log(user);
  const response = await csrfFetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/logout", {
    method: "DELETE",
  });
  dispatch(rmUser());
  return response;
};

const initialState = { user: null };
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case RM_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
