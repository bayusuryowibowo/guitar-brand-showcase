import {
  DELETE_CATEGORY_FAILED,
  DELETE_CATEGORY_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  POST_CATEGORY_FAILED,
  POST_CATEGORY_SUCCESS,
  PUT_CATEGORY_FAILED,
  PUT_CATEGORY_SUCCESS,
} from "../actions/actionType";

const initialState = {
  categories: [],
  loading: false,
  success: null,
  error: null,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case FETCH_CATEGORIES_FAILED:
      return { ...state, loading: false, error: action.payload };
    case POST_CATEGORY_SUCCESS:
      return { ...state, success: action.payload };
    case POST_CATEGORY_FAILED:
      return { ...state, error: action.payload };
    case PUT_CATEGORY_SUCCESS:
      return { ...state, success: action.payload };
    case PUT_CATEGORY_FAILED:
      return { ...state, error: action.payload };
    case DELETE_CATEGORY_SUCCESS:
      return { ...state, success: action.payload };
    case DELETE_CATEGORY_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
