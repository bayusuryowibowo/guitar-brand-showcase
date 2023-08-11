import { POST_LOGIN_FAILED, POST_LOGIN_SUCCESS } from "../actions/actionType";

const initialState = {
  success: {
    statusText: null,
    status: null,
    message: null,
  },
  error: {
    statusText: null,
    status: null,
    message: null,
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LOGIN_SUCCESS:
      return { ...state, success: action.payload };
    case POST_LOGIN_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
