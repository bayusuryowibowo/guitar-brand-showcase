import { applyMiddleware, combineReducers, createStore } from "redux";
import productReducer from "./reducers/productReducer";
import thunk from "redux-thunk";
import imageReducer from "./reducers/imageReducer";

const rootReducer = combineReducers({
  product: productReducer,
  image: imageReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
