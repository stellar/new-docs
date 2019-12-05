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

const buildPathFromFile = ({ relativePath }) => {
  const pathRegex = /^src(.*)\..*$/;

  // Strip `index` so that `index.mdx` files come through with just their
  // relative path.
  const match = pathRegex.exec(relativePath.replace("index", ""));
  return normalizeRoute(match[1]);
};

module.exports = {
  normalizeRoute,
  buildRoute,
  buildPathFromFile,
};
