import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

window.actionListeners = {};

const actionListener = () => (next) => (action) => {
  const listeners = window.actionListeners[action.type];
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
