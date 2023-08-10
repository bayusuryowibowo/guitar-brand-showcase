import {
  FETCH_IMAGE_FAILED,
  FETCH_IMAGE_REQUEST,
  FETCH_IMAGE_SUCCESS,
} from "../actions/actionType";

const initialState = {
  image: {},
  loading: false,
  error: null,
};

export default function imageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_IMAGE_REQUEST:
      return { ...state, loading: true };
    case FETCH_IMAGE_SUCCESS:
      return { ...state, loading: false, image: action.payload };
    case FETCH_IMAGE_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
