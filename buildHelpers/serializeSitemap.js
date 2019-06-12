const { groupBy } = require("lodash");
const { defaultLocale, supportedLanguages } = require("./i18n");

const getPathInfo = ({ path, context }) => {
  const [_, maybeLocale, ...rest] = path.split("/");
  const pathWithoutLocale = rest.join("/").replace(/\/$/, "");

  // All of our translated pages begin with the locale code, like `/es/blah`.
  // If the second section (because the leading slash means the 0th will be '')
  // is in our list of supported languages, bam that's the locale. If not,
  // that's the default locale, and it's a top level route. We only want to
  // Keep top level routes for the default locale, so we need to know that.

  if (supportedLanguages.includes(maybeLocale)) {
    return {
      locale: maybeLocale,
      path: pathWithoutLocale,
      originalPath: path,
      isTopLevel: false,
      context,
    };
  }
  return {
    locale: defaultLocale,
    path: `${maybeLocale}/${pathWithoutLocale}`.replace(/\/$/, ""),
    originalPath: path,
    isTopLevel: true,
    context,
  };
};

const checkIsBlogPostRegex = /blog\/.+/;

const serializeLocale = (locale) => {
  return ({ site, allSitePage }) => {
    const { edges } = allSitePage;
    const pages = edges.map(({ node }) => getPathInfo(node));
    const byPath = groupBy(pages, "path");
    const pagesWithAlternates = Object.values(byPath).reduce(
      (accum, pageVersions) => {
        const mainPage = pageVersions.find(
          (pageVersion) => pageVersion.locale === locale,
        );
        const alternates = pageVersions.filter(
          (pageVersion) => pageVersion.locale !== locale,
        );

        // Don't include blog posts on international sitemaps
        if (
          locale !== defaultLocale &&
          checkIsBlogPostRegex.test(mainPage.originalPath)
        ) {
          return accum;
        }
        accum.push({
          main: mainPage,
          alternates,
        });
        return accum;
      },
      [],
    );

    return pagesWithAlternates.map(({ main, alternates }) => {
      return {
        url: site.siteMetadata.siteUrl + main.originalPath,
        lastmodISO: main.context.lastModified,
        links: alternates.map((a) => ({
          lang: a.locale,
          url: site.siteMetadata.siteUrl + a.originalPath,
          lastmodISO: a.context.lastModified,
        })),
      };
    });
  };
};

const query = `
{
  site {
    siteMetadata {
      siteUrl
    }
  }
  allSitePage {
    edges {
      node {
        path
        context {
          lastModified
        }
      }
    }
  }
}`;

module.exports = {
  serializeLocale,
  query,
};
