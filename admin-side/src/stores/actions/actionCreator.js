import {
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
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

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchProductsRequest())
      const response = await fetch(baseUrl + "/products", {
        method: "GET",
        headers: {
          access_token: localStorage.access_token
        }
      })
      const parsedData = await response.json();
      const action = fetchProductsSuccess(parsedData)
      dispatch(action)
    } catch (error) {
      const action = fetchProductsFailed(error)
      dispatch(action)
    }
  }
}

export const fetchCategoriesRequest = () => {
  return {
    type: FETCH_CATEGORIES_REQUEST,
  };
};

export const fetchCategoriesSuccess = (payload) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload,
  };
};

export const fetchCategoriesFailed = (payload) => {
  return {
    type: FETCH_CATEGORIES_FAILED,
    payload,
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCategoriesRequest())
      const response = await fetch(baseUrl + "/categories", {
        method: "GET",
        headers: {
          access_token: localStorage.access_token
        }
      })
      const parsedData = await response.json()
      const action = fetchCategoriesSuccess(parsedData)
      dispatch(action)
    } catch (error) {
      const action = fetchCategoriesFailed(error)
      dispatch(action)
    }
  }
}