import {
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from "./actionType";

const baseUrl = "http://localhost:3000";

export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
};
export const fetchProductsSuccess = (payload) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload,
  };
};
export const fetchProductsFailed = (payload) => {
  return {
    type: FETCH_PRODUCTS_FAILED,
    payload,
  };
};

export const fetchProductData = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchProductsRequest());
      const response = await fetch(baseUrl + "/products", {
        method: "GET",
      });
      const data = await response.json();
      const action = fetchProductsSuccess(data);
      dispatch(action);
    } catch (error) {
      const action = fetchProductsFailed(error);
      dispatch(action);
    }
  };
};
