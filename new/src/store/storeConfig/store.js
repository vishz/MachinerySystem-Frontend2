import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./rootReducer";

const middlewares = [thunk, createDebounce()]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);

export { store }
