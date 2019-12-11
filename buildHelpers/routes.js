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

const REFERENCE_ROOT = "src/api";
const DOCS_ROOT = "src/docs";

const buildPathFromFile = (filePath) => {
  const pathRegex = /^src(.*)\..*$/;

  // Strip `index` so that `index.mdx` files come through with just their
  // relative path.
  const match = pathRegex.exec(filePath.replace("index", ""));
  return normalizeRoute(match[1]);
};

module.exports = {
  normalizeRoute,
  buildRoute,
  REFERENCE_ROOT,
  DOCS_ROOT,
  buildPathFromFile,
};
