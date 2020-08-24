import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  UPDATE_CURRENT_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER,
  LOGOUT_USER,
} from './actionTypes';

const initialState = {
  user: '',
  error: '',
  isAuthorized: false,
  isLoading: false,
  token: '',
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: payload.user,
        error: '',
        isAuthorized: Boolean(payload.user),
        isLoading: false,
        token: payload.token,
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        user: payload.user,
        error: '',
        isAuthorized: true,
        isLoading: false,
        token: payload.token,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        user: null,
        error: '',
        isAuthorized: false,
        isLoading: false,
        token: '',
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        error: '',
      };
    }
    case LOGIN_USER_ERROR:
    case LOGOUT_USER_ERROR:
    case FETCH_USER_ERROR: {
      return {
        ...state,
        error: payload.message,
        isLoading: false,
      };
    }
    case LOGIN_USER:
    case FETCH_USER:
    case LOGOUT_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_CURRENT_USER: {
      const { firstName, lastName, email, id } = payload;
      return {
        ...state,
        user: {
          firstName,
          lastName,
          email,
          id,
        },
      };
    }
    default:
      return state;
  }
};

export default loginReducer;
