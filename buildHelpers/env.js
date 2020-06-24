const NODE_ENV = process.env.NODE_ENV;
const IS_PRODUCTION = NODE_ENV === "production";

const FEATURES = {
  redesign: "isRedesign",
  docs: "newDocumentation",
};

// Enable new docs everywhere except netlify production builds.
const FEATURE_FLAGS = {
  [FEATURES.docs]: !IS_PRODUCTION,
};

exports.IS_PRODUCTION = IS_PRODUCTION;
exports.FEATURES = FEATURES;
exports.FEATURE_FLAGS = FEATURE_FLAGS;
