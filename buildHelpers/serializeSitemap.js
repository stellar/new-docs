const { defaultLocale, supportedLanguages } = require("./i18n");

const getLocaleFromPath = (path) => {
  const maybeLocale = path.split("/")[1];

  // All of our translated pages begin with the locale code, like `/es/blah`.
  // If the second section (because the leading slash means the 0th will be '')
  // is in our list of supported languages, bam that's the locale. If not,
  // that's the default locale, and it's a top level route. We only want to
  // Keep top level routes for the default locale, so we need to know that.

  if (supportedLanguages.includes(maybeLocale)) {
    return {
      locale: maybeLocale,
      isTopLevel: false,
    };
  }
  return {
    locale: defaultLocale,
    isTopLevel: true,
  };
};

const serializeLocale = (locale) => {
  return ({ site, allSitePage }) =>
    allSitePage.edges
      .filter(({ node }) => {
        const { locale: pathLocale, isTopLevel } = getLocaleFromPath(node.path);
        if (locale === defaultLocale) {
          return pathLocale === locale && isTopLevel;
        }
        return pathLocale === locale;
      })
      .map((edge) => {
        return {
          url: site.siteMetadata.siteUrl + edge.node.path,
          changefreq: `daily`,
          priority: 0.7,
          lastmodISO: edge.node.context.lastModified,
        };
      });
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
