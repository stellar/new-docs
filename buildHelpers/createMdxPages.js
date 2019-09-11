const path = require("path");
const { defaultLocale, supportedLanguages } = require("./i18n");
const { groupBy } = require("lodash");

exports.getFileName = (node) => {
  switch (node.internal.type) {
    case "File":
      return node.name;
    case "Mdx":
      return node.fileAbsolutePath
        ? path.parse(node.fileAbsolutePath).name
        : null;
    default:
      return null;
  }
};

exports.getLocale = (filename) => {
  const nameSections = filename.split(".");
  const length = nameSections.length;

  // If there are 2+ sections after splitting on `.` (excluding file extension)
  // and the last one is in our list of supported languages, that's our locale
  if (length >= 2 && supportedLanguages.includes(nameSections[length - 1])) {
    return nameSections[length - 1];
  }
  return defaultLocale;
};

const sourceFolders = [
  {
    folder: "",
    component: path.resolve(".", "templates", "reference.js"),
  },
];

exports.createMdxPages = ({ actions, mdxFiles, catalogs }) => {
  const { createPage } = actions;

  // Munge the data so it's easier to work with. Group based on (pre-localized)
  // route, with an array of localized pages.
  const pagesByRoute = groupBy(
    mdxFiles
      .map(({ node }) => {
        // Find which component to use.
        const source = sourceFolders.find(
          ({ folder }) =>
            !folder || node.fileAbsolutePath.includes(`/${folder}/`),
        );

        if (!source) {
          return null;
        }
        return {
          ...node,
          component: source.component,
          // `src/content` is hard coded, the rest of the file path is used as
          // the route.
          route: node.fields.path,
        };
      })
      .filter(Boolean),
    "route",
  );

  Object.entries(pagesByRoute).forEach(([route, pages]) => {
    // We need to know which languages are translated so we can provide
    // alternates URLs for SEO.
    const translatedLocales = supportedLanguages.filter((locale) =>
      pages.some((page) => page.fields.locale === locale),
    );
    // For each localized page loaded, tell Gatsby about it.
    pages.forEach((page) => {
      const { locale } = page.fields;
      const path = locale === defaultLocale ? route : `/${locale}${route}`;
      const basePage = {
        component: page.component,
        context: {
          locale,
          urlPath: path,
          catalog: catalogs[locale],
          id: page.id,
          // List alternate pages so we can include head <link>s to them
          alternateUrls: translatedLocales
            .filter((l) => l !== locale)
            .map((l) => ({
              locale: l,
              path: l === defaultLocale ? route : `/${l}${route}`,
            })),
        },
      };

      // If it's the default locale, make a top level route too.
      if (locale === defaultLocale) {
        createPage({
          ...basePage,
          path: route,
        });
      }
      createPage({
        ...basePage,
        path,
      });
    });

    // If there are any locales that don't have translated pages available,
    // create a page with the default locale's version.
    // const missingLocales = supportedLanguages.filter(
    //   (locale) => !pages.some((page) => page.fields.locale === locale),
    // );
    // missingLocales.forEach((missingLocale) => {
    //   const defaultPage = pages.find(
    //     (page) => page.fields.locale === defaultLocale,
    //   );
    //   createPage({
    //     path: `/${missingLocale}${route}`,
    //     component: defaultPage.component,
    //     context: {
    //       locale: missingLocale,
    //       catalog: catalogs[missingLocale],
    //       id: defaultPage.id,
    //       translated: false,
    //     },
    //   });
    // });
  });
};
