const baseUrl = "http://localhost:3000";

export const fetchProductsRequest = () => {
  return {
    type: "product/fetchProductsRequest"
  }
}
export const fetchProductsSuccess = (payload) => {
  return {
    type: "product/fetchProductsSuccess",
    payload
  }
}
export const fetchProductsFailed = (payload) => {
  return {
    type: "product/fetchProductsFailed",
    payload
  }
}

export const fetchProductData = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchProductsRequest())
      const response = await fetch(baseUrl + "/products", {
        method: "GET",
      });
      const data = await response.json();
      const action = fetchProductsSuccess(data)
      dispatch(action)
    } catch (error) {
      const action = fetchProductsFailed(error)
      dispatch(action)
    }
  }
};