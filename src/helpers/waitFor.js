export const waitFor = (predicate, interval = 500) =>
  new Promise((resolve) => {
    setInterval(() => {
      if (predicate) {
        resolve();
      }
    }, interval);
  });
