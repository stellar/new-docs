const path = require("path");

const { defaultLocale } = require("./i18n");

const normalizeRoute = (route) => {
  console.log(path.posix);
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

const buildRoute = (locale, ...args) => {
  return normalizeRoute(
    path.posix.join(
      locale === defaultLocale ? "" : locale,
      ...args.filter(Boolean).map(String),
    ),
  );
};

module.exports = {
  normalizeRoute,
  buildRoute,
};
