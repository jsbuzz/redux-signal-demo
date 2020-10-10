import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

window.actionListeners = {};

const asKey = (str) => (typeof str === "function" ? str.toString() : str);

const actionListener = () => (next) => (action) => {
  const key = typeof action === "function" ? asKey(action) : action.type;
  const listeners = window.actionListeners[key];
  if (listeners) {
    listeners.forEach((listener) => listener(action));
  }
  return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(actionListener, thunk))
);
