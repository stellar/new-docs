import path from "path";
import { LINK_DESTINATIONS } from "constants/routes";

import {
  buildRoute,
  buildPathFromFile,
  normalizeRoute,
} from "../../buildHelpers/routes";

export { buildRoute, buildPathFromFile, normalizeRoute };

/**
 * Check if a link should be treated as relative or not.
 * @param {string} href An unprocessed link destination that might be relative.
 * Some examples:
 * ./something
 * ../something
 * /something
 * something
 * https://example.com/something
 * This will treat urls like `example.com/something` as relative, but I can't
 * find a method to parse URLs without a protocol. This should work currently,
 * since all external URLs look to have a protocol, but any incorrect URLs added
 * in the future will render as `developers.stellar.org/example.com/something`.
 * @return {boolean} Whether it's relative or not
 */
export const isRelativeUrl = (href) => {
  try {
    // eslint-disable-next-line no-new
    new URL(href);
    return false;
  } catch (e) {
    // do nothing, it's not a complete URL
  }
  if (href.startsWith("/")) {
    return false;
  }
  return true;
};

export const resolveRelativeUrl = (relativeUrl, location) =>
  buildPathFromFile(path.resolve(path.dirname(location), relativeUrl));

export const getLinkTarget = (link) => {
  if (link.startsWith("/api")) {
    return LINK_DESTINATIONS.api;
  }
  if (link.startsWith("/docs")) {
    return LINK_DESTINATIONS.docs;
  }
  return LINK_DESTINATIONS.external;
};
