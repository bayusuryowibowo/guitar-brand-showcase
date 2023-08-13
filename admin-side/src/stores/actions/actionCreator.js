import {
  DELETE_CATEGORY_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORY_FAILED,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_DETAIL_PRODUCT_FAILED,
  FETCH_DETAIL_PRODUCT_REQUEST,
  FETCH_DETAIL_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  POST_CATEGORY_FAILED,
  POST_CATEGORY_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGIN_SUCCESS,
  POST_PRODUCT_FAILED,
  POST_PRODUCT_SUCCESS,
  POST_REGISTER_FAILED,
  POST_REGISTER_SUCCESS,
  PUT_CATEGORY_FAILED,
  PUT_CATEGORY_SUCCESS,
  PUT_PRODUCT_FAILED,
  PUT_PRODUCT_SUCCESS,
} from "./actionType";

const baseUrl = "https://sweetwater.bayusuryowibowo.xyz";

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
      if (!response.ok) throw response;
      const parsedData = await response.json();
      const action = fetchProductsSuccess(parsedData);
      dispatch(action);
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = fetchProductsFailed(payload);
      dispatch(action);
      throw payload;
    }
  };
};

export const fetchDetailProductRequest = () => {
  return {
    type: FETCH_DETAIL_PRODUCT_REQUEST,
  };
};

export const fetchDetailProductSuccess = (payload) => {
  return {
    type: FETCH_DETAIL_PRODUCT_SUCCESS,
    payload,
  };
};

export const fetchDetailProductFailed = (payload) => {
  return {
    type: FETCH_DETAIL_PRODUCT_FAILED,
    payload,
  };
};

export const fetchDetailProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchDetailProductRequest());
      const response = await fetch(baseUrl + `/products/${id}`, {
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw response;
      const parsedData = await response.json();
      const action = fetchDetailProductSuccess(parsedData);
      dispatch(action);
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = fetchDetailProductFailed(payload);
      dispatch(action);
      throw payload;
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
      if (!response.ok) throw response;
      const parsedData = await response.json();
      const action = fetchCategoriesSuccess(parsedData);
      dispatch(action);
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = fetchCategoriesFailed(payload);
      dispatch(action);
      return payload;
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
      if (!response.ok) throw response;
      const { message, access_token } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      dispatch(postLoginSuccess(payload));
      localStorage.access_token = access_token;
      return payload;
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      dispatch(postLoginFailed(payload));
      throw payload;
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
      if (!response.ok) throw response;
      const { message } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      dispatch(postRegisterSuccess(payload));
      return payload;
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      dispatch(postRegisterFailed(payload));
      throw payload;
    }
  };
};

export const postProductSuccess = (payload) => {
  return {
    type: POST_PRODUCT_SUCCESS,
    payload,
  };
};

export const postProductFailed = (payload) => {
  return {
    type: POST_PRODUCT_FAILED,
    payload,
  };
};

export const postProduct = (input) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + "/products", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw response;
      const { message } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      const action = postProductSuccess(payload);
      dispatch(action);
      return payload;
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = postProductFailed(payload);
      dispatch(action);
      throw payload;
    }
  };
};

export const putProductSuccess = (payload) => {
  return {
    type: PUT_PRODUCT_SUCCESS,
    payload,
  };
};

export const putProductFailed = (payload) => {
  return {
    type: PUT_PRODUCT_FAILED,
    payload,
  };
};

export const putProduct = (id, input) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw response;
      const { message } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      const action = putProductSuccess(payload);
      dispatch(action);
      return payload;
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = putProductFailed(payload);
      dispatch(action);
      throw payload;
    }
  };
};

export const deleteProductSuccess = (payload) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload,
  };
};

export const deleteProductFailed = (payload) => {
  return {
    type: DELETE_PRODUCT_FAILED,
    payload,
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw response;
      const { message } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      const action = deleteProductSuccess(payload);
      dispatch(action);
      return payload;
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = deleteProductFailed(payload);
      dispatch(action);
      throw payload;
    }
  };
};

export const postCategorySuccess = (payload) => {
  return {
    type: POST_CATEGORY_SUCCESS,
    payload,
  };
};

export const postCategoryFailed = (payload) => {
  return {
    type: POST_CATEGORY_FAILED,
    payload,
  };
};

export const postCategory = (input) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + "/categories", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw response;
      const { message } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      const action = postCategorySuccess(payload);
      dispatch(action);
      return payload;
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = postCategoryFailed(payload);
      dispatch(action);
      throw payload;
    }
  };
};

export const fetchCategoryRequest = () => {
  return {
    type: FETCH_CATEGORY_REQUEST,
  };
};

export const fetchCategorySuccess = (payload) => {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload,
  };
};

export const fetchCategoryFailed = (payload) => {
  return {
    type: FETCH_CATEGORY_FAILED,
    payload,
  };
};

export const fetchCategory = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCategoryRequest());
      const response = await fetch(baseUrl + `/categories/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw response;
      const data = await response.json();
      const action = fetchCategorySuccess(data);
      dispatch(action);
      return;
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = fetchCategoryFailed(payload);
      dispatch(action);
      throw payload;
    }
  };
};

export const putCategorySuccess = (payload) => {
  return {
    type: PUT_CATEGORY_SUCCESS,
    payload,
  };
};

export const putCategoryFailed = (payload) => {
  return {
    type: PUT_CATEGORY_FAILED,
    payload,
  };
};

export const putCategory = (id, input) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw response;
      const { message } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      const action = putCategorySuccess(payload);
      dispatch(action);
      return payload;
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = putCategoryFailed(payload);
      dispatch(action);
      throw payload;
    }
  };
};

export const deleteCategorySuccess = (payload) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload,
  };
};

export const deleteCategoryFailed = (payload) => {
  return {
    type: DELETE_PRODUCT_FAILED,
    payload,
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + `/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw response;
      const { message } = await response.json();
      const payload = {
        statusText: response.statusText,
        status: response.status,
        message,
      };
      const action = deleteCategorySuccess(payload);
      dispatch(action);
      return payload;
    } catch (error) {
      const { message } = await error.json();
      const payload = {
        statusText: error.statusText,
        status: error.status,
        message,
      };
      const action = deleteCategoryFailed(payload);
      dispatch(action);
      throw payload;
    }
  };
};
