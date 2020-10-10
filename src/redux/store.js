import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { actionListener } from "../redux-signal";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(actionListener, thunk))
);
