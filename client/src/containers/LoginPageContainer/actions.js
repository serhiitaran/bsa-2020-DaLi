import { LOGIN_USER, LOGOUT_USER, FETCH_USER, REGISTER_ADMIN } from './actionTypes';

export const login = (request) => {
  return {
    type: LOGIN_USER,
    request,
  };
};

export const registerAdmin = (data) => {
  return {
    type: REGISTER_ADMIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const fetchUser = () => {
  return {
    type: FETCH_USER,
  };
};

/* export const hideUserUpdateMessage = () => {
  return {
    type: HIDE_USER_UPDATE_MESSAGE,
  };
};

export const updateUserError = (payload) => {
  return {
    type: UPDATE_USER_ERROR,
    payload,
  };
};

 */
