import {
  FETCH_DETAIL_PRODUCT_FAILED,
  FETCH_DETAIL_PRODUCT_REQUEST,
  FETCH_DETAIL_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  POST_PRODUCT_FAILED,
  POST_PRODUCT_SUCCESS,
} from "../actions/actionType";

const initialState = {
  products: [],
  product: {},
  loading: false,
  success: null,
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
    case FETCH_DETAIL_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case FETCH_DETAIL_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case FETCH_DETAIL_PRODUCT_FAILED:
      return { ...state, loading: false, error: action.payload };
    case POST_PRODUCT_SUCCESS:
      return { ...state, success: action.payload };
    case POST_PRODUCT_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
