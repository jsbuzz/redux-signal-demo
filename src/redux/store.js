import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createActionListener } from "../redux-transitions";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const { actionListener, setStore } = createActionListener();
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(actionListener, thunk))
);

setStore(store);

export default store;
