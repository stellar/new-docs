import path from "path";
import { LINK_DESTINATIONS } from "constants/routes";

import {
  buildRoute,
  buildPathFromFile,
  normalizeRoute,
} from "../../buildHelpers/routes";

export { buildRoute, buildPathFromFile, normalizeRoute };

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
