import {
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from "../actions/actionType";

const initialState = {
  products: [],
  loading: false,
  error: null,
};
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
