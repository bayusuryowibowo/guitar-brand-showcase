import {
  FETCH_DETAIL_PRODUCT_SUCCESS,
  FETCH_IMAGE_FAILED,
  FETCH_IMAGE_REQUEST,
  FETCH_IMAGE_SUCCESS,
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

export const fetchDetailProductSuccess = (payload) => {
  return {
    type: FETCH_DETAIL_PRODUCT_SUCCESS,
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

export const fetchDetailProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchProductsRequest());
      const response = await fetch(baseUrl + `/products/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      const action = fetchDetailProductSuccess(data);
      dispatch(action);
    } catch (error) {
      const action = fetchProductsFailed(error);
      dispatch(action);
    }
  };
};

export const fetchImageRequest = () => {
  return {
    type: FETCH_IMAGE_REQUEST,
  };
};

export const fetchImageSuccess = (payload) => {
  return {
    type: FETCH_IMAGE_SUCCESS,
    payload,
  };
};

export const fetchImageFailed = (payload) => {
  return {
    type: FETCH_IMAGE_FAILED,
    payload,
  };
};

export const fetchImage = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(fetchImageRequest())
      const response = await fetch(baseUrl + `/images?productId=${productId}`, {
        method: "GET"
      })
      const data = await response.json()
      const action = fetchImageSuccess(data)
      dispatch(action)
    } catch (error) {
      const action = fetchImageFailed(error)
      dispatch(action)
    }
  }
}
