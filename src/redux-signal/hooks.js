import { useEffect, useState } from "react";

export function useListeners(...listeners) {
  useEffect(() => {
    listeners.reduce((a, c) => {
      if (typeof c === "function") {
        a.forEach((e) => {
          const eventListeners = window.actionListeners[e];
          if (eventListeners) {
            eventListeners.push(c);
          } else {
            window.actionListeners[e] = [c];
          }
        });
        return [];
      }
      return [...a, c];
    }, []);

    return function cleanup() {
      console.log("before cleanup", { ...window.actionListeners });
      listeners.reduce((a, c) => {
        if (typeof c === "function") {
          a.forEach((e) => {
            const eventListeners = window.actionListeners[e];
            eventListeners.splice(eventListeners.indexOf(c), 1);
          });
          return [];
        }
        return [...a, c];
      }, []);
      console.log("after cleanup", { ...window.actionListeners });
    };
  }, []);
}

export function usePendingState({ pending, done, defaultValue = false }) {
  const [loading, setLoading] = useState(defaultValue);

  useListeners(
    pending,
    () => setLoading(true),

    ...done,
    () => setLoading(false)
  );

  return loading;
}
