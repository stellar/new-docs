const path = require("path");

const { defaultLocale } = require("./i18n");

const normalizeRoute = (route) => {
  let outputRoute = route;
  if (!outputRoute.startsWith("/")) {
    outputRoute = `/${outputRoute}`;
  }
  if (!outputRoute.endsWith("/")) {
    outputRoute = `${outputRoute}/`;
  }
  if (path.posix) {
    return path.posix.normalize(outputRoute);
  }

  return path.normalize(outputRoute);
};

const buildRoute = (locale, ...args) =>
  normalizeRoute(
    path.posix.join(
      locale === defaultLocale ? "" : locale,
      ...args.filter(Boolean).map(String),
    ),
  );

const REFERENCE_ROOT = "api";
const DOCS_ROOT = "docs";

const buildPathFromFile = (filePath) => {
  const pathRegex = /(.*)\..*$/;
  // Strip `index` so that `index.mdx` files come through with just their
  // relative path.
  const pathWithIndexStripped = filePath.replace("index", "");
  const match = pathRegex.exec(pathWithIndexStripped);

  // Placeholder links go through this code path too, and they don't have a file
  // extension and thus don't match the regex. Hack fix to avoid issues.
  const roughRoute = match === null ? pathWithIndexStripped : match[1];

  return normalizeRoute(roughRoute);
};

module.exports = {
  normalizeRoute,
  buildRoute,
  REFERENCE_ROOT,
  DOCS_ROOT,
  buildPathFromFile,
};
