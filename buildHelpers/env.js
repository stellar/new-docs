const NODE_ENV = process.env.NODE_ENV;
const BETA_FLAG = process.env.IS_BETA || "false";
const URL = process.env.URL || "https://stellar.org";
const NETLIFY_DEPLOY_URL = process.env.DEPLOY_PRIME_URL || URL;
const NETLIFY_ENV = process.env.CONTEXT || "development";

const IS_BETA = BETA_FLAG === "true";
const IS_PRODUCTION = !IS_BETA && NETLIFY_ENV === "production";

const FEATURES = {
  redesign: "isRedesign",
  docs: "newDocumentation",
};

// Enable new docs everywhere except netlify production builds.
const FEATURE_FLAGS = {
  [FEATURES.docs]: !IS_PRODUCTION,
};

exports.IS_PRODUCTION = IS_PRODUCTION;
exports.IS_BETA = IS_BETA;
exports.IS_BUILD = NODE_ENV === "production";
exports.SITE_URL = IS_PRODUCTION ? URL : NETLIFY_DEPLOY_URL;
exports.FEATURES = FEATURES;
exports.FEATURE_FLAGS = FEATURE_FLAGS;
