import { useEffect, useState } from "react";

const thunkRX = /.*=>.*dispatch.*=>/i;

const isThunk = (fn) => !!fn.toString().match(thunkRX);
const asKey = (str) => (typeof str === "function" ? str().toString() : str);

export function useActionListeners(...listeners) {
  useEffect(() => {
    listeners.reduce((a, c) => {
      if (typeof c === "function" && !isThunk(c)) {
        a.forEach((e) => {
          const key = asKey(e);
          const eventListeners = window.actionListeners[key];
          if (eventListeners) {
            eventListeners.push(c);
          } else {
            window.actionListeners[key] = [c];
          }
        });
        return [];
      }
      return [...a, c];
    }, []);

    return function cleanup() {
      console.log("before cleanup", { ...window.actionListeners });
      listeners.reduce((a, c) => {
        if (typeof c === "function" && !isThunk(c)) {
          a.forEach((e) => {
            const key = asKey(e);
            const eventListeners = window.actionListeners[key];
            eventListeners.splice(eventListeners.indexOf(c), 1);
          });
          return [];
        }
        return [...a, c];
      }, []);
      console.log("after cleanup", { ...window.actionListeners });
    };
    // eslint-disable-next-line
  }, []);
}

const asArray = (a) => (Array.isArray(a) ? a : [a]);
export function useFetchState({ fetch, done, error, errorHandler = (e) => e }) {
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

    ...asArray(done),
    () =>
      setState({
        pending: false,
        error: null,
      }),

    ...asArray(error),
    (errorAction) =>
      setState({
        pending: false,
        error: errorHandler(errorAction),
      })
  );

  return [state.pending, state.error];
}

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
