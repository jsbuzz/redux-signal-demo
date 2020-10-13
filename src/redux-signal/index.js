import { useEffect, useState } from "react";
import { useStore } from "react-redux";

// 32 bit FNV-1a hash
// Ref.: http://isthe.com/chongo/tech/comp/fnv/
function hash(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; ++i) {
    hash ^= str.charCodeAt(i);
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

const actionListeners = {};
window.actionListeners = actionListeners;

const thunkRX = /.*=>.*dispatch.*=>/i;

const thunkKey = (thunkFn) => "thunk#" + hash(thunkFn.toString());

const isThunk = (fn) => !!fn.toString().match(thunkRX);
const asArray = (a) => (Array.isArray(a) ? a : [a]);
const asKey = (str) => (typeof str === "function" ? thunkKey(str()) : str);
const actionKey = (action) =>
  typeof action === "function" ? thunkKey(action) : action.type;

// redux middleware that will call the action listeners
export const createActionListener = () => {
  const context = {};

  return {
    actionListener: () => (next) => (action) => {
      // console.log(context.store);
      const key = actionKey(action);
      const listeners = context.store._actionListeners[key];
      if (listeners) {
        listeners.forEach((listener) => listener(action));
      }
      if (!action._stopPropagation) return next(action);
      return null;
    },
    setStore: (store) => {
      context.store = store;
    },
  };
};

const processListeners = (listeners, eventCallback) => {
  listeners.reduce((a, c) => {
    if (typeof c === "function" && !isThunk(c)) {
      a.forEach((e) => {
        const key = asKey(e);
        eventCallback(key, c);
      });
      return [];
    }
    return [...a, c];
  }, []);
};

// hook for setting listeners on actions
export function useActionListeners(...listeners) {
  const store = useStore();
  if (!store._actionListeners) {
    store._actionListeners = {};
  }
  useEffect(() => {
    processListeners(listeners, (event, callback) => {
      const eventListeners = store._actionListeners[event];
      if (eventListeners) {
        eventListeners.push(callback);
      } else {
        store._actionListeners[event] = [callback];
      }
    });

    return function cleanup() {
      processListeners(listeners, (event, callback) => {
        const eventListeners = store._actionListeners[event];
        eventListeners.splice(eventListeners.indexOf(callback), 1);
      });
    };
    // eslint-disable-next-line
  }, []);
}

// hook for a standard fetch operation with pending and error states
export function useFetchState({
  fetch,
  success,
  failure,
  failureHandler = (e) => e,
}) {
  const [state, setState] = useState({
    pending: false,
    error: null,
  });

  useActionListeners(
    ...asArray(fetch),
    () =>
      setState({
        pending: true,
        error: null,
      }),

    ...asArray(success),
    () =>
      setState({
        pending: false,
        error: null,
      }),

    ...asArray(failure),
    (errorAction) =>
      setState({
        pending: false,
        error: failureHandler(errorAction),
      })
  );

  return [state.pending, state.error];
}

// hook as an experiment
// modifies the thunk and makes it trigger the pending state
export const withPendingState = (thunk) => (...done) => {
  const [loading, setLoading] = useState(false);

  useActionListeners(...done, () => setLoading(false));

  return [
    loading,
    (...a) => {
      setLoading(true);
      return thunk(...a);
    },
  ];
};

// hook for transitions
export const useTransitions = (
  transitionStates,
  transitionReducer,
  stopPropagation = []
) => {
  const [state, setState] = useState({});

  let listeners = [];
  Object.keys(transitionStates).forEach((transition) => {
    listeners = [
      ...listeners,
      ...asArray(transitionStates[transition]),
      (action) => {
        setState(transitionReducer(transition, action));
        if (stopPropagation.includes(action.type)) {
          action._stopPropagation = true;
        }
      },
    ];
  });

  useActionListeners(...listeners);

  return state;
};
