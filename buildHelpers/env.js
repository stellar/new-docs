const {
  NODE_ENV,
  URL = "https://stellar.org",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = URL,
  CONTEXT: NETLIFY_ENV = "development",
} = process.env;

const IS_LIVE = NETLIFY_ENV === "production";
exports.IS_LIVE = IS_LIVE;
exports.IS_PROD = NODE_ENV === "production";
exports.SITE_URL = IS_LIVE ? URL : NETLIFY_DEPLOY_URL;

exports.FEATURE_FLAGS = {
  docs: !IS_LIVE,
};
