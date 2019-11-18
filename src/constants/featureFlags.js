import { FEATURES as FEATURES_LIST } from "../../buildHelpers/env";

const { CONTEXT: NETLIFY_ENV = "development" } = process.env;

const IS_LIVE = NETLIFY_ENV === "production";

export const FEATURES = FEATURES_LIST;

// Enable new docs everywhere except netlify production builds.
export const DOCS = !IS_LIVE;
