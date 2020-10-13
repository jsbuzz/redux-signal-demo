import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createActionListener } from "../redux-signal";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxTransitions = createActionListener();
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxTransitions.actionListener, thunk))
);

reduxTransitions.setStore(store);

export default store;
