const initialState = {
  products: [],
  loading: false,
  error: null,
};
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "product/fetchProductsRequest":
      return { ...state, loading: true };
    case "product/fetchProductsSuccess":
      return { ...state, loading: false, products: action.payload };
    case "product/fetchProductsFailed":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}