const performance = typeof window !== "undefined" ? window.performance : null;

export const hasHighPrecision = Boolean(performance);

// Safari doesn't expose the performance API, so make a wrapper API and expose a
// lower precision form of it if not available.
let clear = (perfMark) => {
  performance.clearMarks(perfMark);
  performance.clearMarks(`${perfMark} end`);
  performance.clearMeasures(`${perfMark} measure`);
};
let internalMark = performance?.mark.bind(performance);
let internalMeasure = (perfMark) => {
  const endMark = `${perfMark} end`;
  const measureName = `${perfMark} measure`;
  performance.mark(endMark);
  performance.measure(measureName, perfMark, endMark);
  const results = performance.getEntriesByName(measureName);
  // Get the duration off the last (most recent measurement)
  const { duration } = results[results.length - 1];
  clear(perfMark);
  return { time: duration, hasHighPrecision };
};
if (!hasHighPrecision) {
  const marks = {};
  internalMark = (perfMark) => {
    marks[perfMark] = Date.now();
  };
  clear = (perfMark) => {
    marks[perfMark] = undefined;
  };
  internalMeasure = (perfMark) => {
    const time = Date.now() - marks[perfMark];
    clear(perfMark);
    return time;
  };
}

/**
 * mark begins recording a high precision (if available) duration, which can be
 * concluded with a call to measure() using the same performance mark constant.
 * @param {string} perfMark A performance mark constant
 */
export const mark = internalMark;

/**
 * measure finishes (and removes) a previously started performance mark.
 * @param {string} perfMark A performance mark constant
 * @returns {number} The duration in milliseconds
 */
export const measure = internalMeasure;
