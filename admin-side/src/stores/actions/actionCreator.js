import {
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGIN_SUCCESS,
  POST_REGISTER_FAILED,
  POST_REGISTER_SUCCESS,
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
      dispatch(fetchProductsRequest());
      const response = await fetch(baseUrl + "/products", {
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const parsedData = await response.json();
      const action = fetchProductsSuccess(parsedData);
      dispatch(action);
    } catch (error) {
      const action = fetchProductsFailed(error);
      dispatch(action);
    }
  };
};

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
      dispatch(fetchCategoriesRequest());
      const response = await fetch(baseUrl + "/categories", {
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const parsedData = await response.json();
      const action = fetchCategoriesSuccess(parsedData);
      dispatch(action);
    } catch (error) {
      const action = fetchCategoriesFailed(error);
      dispatch(action);
    }
  };
};

export const postLoginSuccess = (payload) => {
  return {
    type: POST_LOGIN_SUCCESS,
    payload,
  };
};

export const postLoginFailed = (payload) => {
  return {
    type: POST_LOGIN_FAILED,
    payload,
  };
};

export const postLogin = (input) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + "/login", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message, access_token } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      dispatch(postLoginSuccess(payload));
      localStorage.access_token = access_token;
      return;
    } catch (error) {
      const payload = {
        statusText: error.response.statusText,
        status: error.response.status,
        message: error.message,
      };
      dispatch(postLoginFailed(payload));
      throw error;
    }
  };
};

export const postRegisterSuccess = (payload) => {
  return {
    type: POST_REGISTER_SUCCESS,
    payload,
  };
};

export const postRegisterFailed = (payload) => {
  return {
    type: POST_REGISTER_FAILED,
    payload,
  };
};

export const postRegister = (input) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + "/register", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      dispatch(postRegisterSuccess(payload));
      return;
    } catch (error) {
      const payload = {
        statusText: error.response.statusText,
        status: error.response.status,
        message: error.response.message,
      };
      dispatch(postRegisterFailed(payload));
      throw error;
    }
  };
};
