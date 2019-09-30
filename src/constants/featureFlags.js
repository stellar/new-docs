const { CONTEXT: NETLIFY_ENV = "development" } = process.env;

const IS_LIVE = NETLIFY_ENV === "production";

// Enable new docs everywhere except netlify production builds.
export const DOCS = !IS_LIVE;
