const NODE_ENV = process.env.NODE_ENV;
const BETA_FLAG = process.env.IS_BETA || "false";

const IS_LOCAL = process.env.PWD !== "/app/src";
const IS_BUILD = process.env.npm_lifecycle_event === "build";
const IS_BETA = BETA_FLAG === "true";
const IS_PRODUCTION = !IS_BETA && NODE_ENV === "production";

const SITE_URL = IS_LOCAL
  ? "http://localhost:8000"
  : process.env.URL || "https://developers.stellar.org";

const FEATURES = {
  redesign: "isRedesign",
  docs: "newDocumentation",
};

// Enable new docs everywhere except netlify production builds.
const FEATURE_FLAGS = {
  [FEATURES.docs]: !IS_PRODUCTION,
};

exports.IS_LOCAL = IS_LOCAL;
exports.IS_PRODUCTION = IS_PRODUCTION;
exports.IS_BETA = IS_BETA;
exports.IS_BUILD = IS_BUILD;
exports.SITE_URL = SITE_URL;
exports.FEATURES = FEATURES;
exports.FEATURE_FLAGS = FEATURE_FLAGS;

// eslint-disable-next-line no-console
console.log(JSON.stringify(exports, null, 2));
