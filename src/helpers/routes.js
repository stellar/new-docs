import path from "path";
import url from "url";
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
  const hrefObj = url.parse(href);
  if (!href) {
    return false;
  }
  if (hrefObj.host) {
    return false;
  }
  if (hrefObj.pathname?.startsWith("/")) {
    return false;
  }
  return true;
};

export const isHashUrl = (href) => href.startsWith("#");

/**
 * resolveRelativeUrl takes a file path and a path relative to it, and returns a
 * well-formed URL.
 * @param {string} originalFile The original file path that the page was
 * generated from. This should end in .mdx.
 * @param {string} relativeUrl A relative path.
 * @return {string} The final URL, ready for use in an <a> tag.
 */
export const resolveRelativePath = (originalFile, relativeUrl) =>
  buildPathFromFile(
    path.resolve(normalizeRoute(path.dirname(originalFile)), relativeUrl),
  );

export const getLinkTarget = (link) => {
  if (link.startsWith("/api")) {
    return LINK_DESTINATIONS.api;
  }
  if (link.startsWith("/docs")) {
    return LINK_DESTINATIONS.docs;
  }
  return LINK_DESTINATIONS.external;
};
