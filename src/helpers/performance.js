export const hasHighPrecision = Boolean(window.performance);

// Safari doesn't expose the performance API, so make a wrapper API and expose a
// lower precision form of it if not available.
let clear = (perfMark) => {
  window.performance.clearMarks(perfMark);
  window.performance.clearMeasures(perfMark);
};
let internalMark = window.performance?.mark.bind(window.performance);
let internalMeasure = (perfMark) => {
  const { duration } = window.performance.measure(null, perfMark);
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
