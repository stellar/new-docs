import React from "react";

/**
 * useSubscription makes it easy to make a simple event emitter.
 * @returns {object} An object with functions `subscribe` and `emit`. The
 * `subscribe` method accepts a callback function and returns an `unsubscribe`
 * function, and `emit` will broadcast a value to all subscribers
 */
export const useSubscription = () => {
  const subscribersRef = React.useRef([]);
  const subscribe = React.useCallback((cb) => {
    subscribersRef.current.push(cb);

    return function unsubscribe() {
      const index = subscribersRef.current.indexOf(cb);
      subscribersRef.current.splice(index, 1);
    };
  }, []);
  const emit = React.useCallback((value) => {
    subscribersRef.current.forEach((subscriber) => subscriber(value));
  }, []);

  return React.useMemo(() => ({ subscribe, emit }), [subscribe, emit]);
};
