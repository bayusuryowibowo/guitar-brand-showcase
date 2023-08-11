import { applyMiddleware, combineReducers, createStore } from "redux"
import productReducer from "./reducers/productReducer"
import thunk from "redux-thunk"
import categoryReducer from "./reducers/categoryReducer"

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store