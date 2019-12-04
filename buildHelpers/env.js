const {
  NODE_ENV,
  IS_BETA: BETA_FLAG = "false",
  URL = "https://stellar.org",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = URL,
  CONTEXT: NETLIFY_ENV = "development",
} = process.env;

const IS_PRODUCTION = NETLIFY_ENV === "production";
const IS_BETA = BETA_FLAG === "true";

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
