const Promise = require("bluebird");
const path = require("path");

const {
  createContentfulPages,
} = require("./buildHelpers/createContentfulPages");
const {
  createMdxPages,
  getFileName,
  getLocale,
} = require("./buildHelpers/createMdxPages");
const {
  contentfulLocale,
  defaultLocale,
  supportedLanguages,
} = require("./buildHelpers/i18n");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  const filename = getFileName(node);
  if (filename) {
    // For any MDX files, we want to know if they have a locale associated with
    // them. Pull it from the filename.
    const locale = getLocale(filename);
    console.log(
      `Adding 'locale' field to ${
        node.internal.type
      } ${filename}, '${locale}'.`,
    );
    createNodeField({
      node,
      name: "locale",
      value: locale,
    });
  }
};

// Build an object of catalogs keyed by the locale string.
const catalogs = supportedLanguages.reduce((accum, locale) => {
  accum[locale] = require(`./src/locale/${locale}/messages.js`);
  return accum;
}, {});

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(
    `
      {
        allMdx(filter: { fileAbsolutePath: { ne: null } }) {
          edges {
            node {
              id
              fileAbsolutePath
              fields {
                locale
              }
            }
          }
        }
        allContentfulBlogPost {
          edges {
            node {
              title
              slug
              updatedAt
            }
          }
        }
      }
    `,
  );
  if (result.errors) {
    console.log(result.errors);
    return Promise.reject(result.errors);
  }

  const mdxFiles = result.data.allMdx.edges;
  createMdxPages({ actions, mdxFiles, catalogs });

  const posts = result.data.allContentfulBlogPost.edges;
  createContentfulPages({ posts, actions, catalogs });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  // All of our other page generation techniques attach a `locale` field to
  // page context, so if it's missing, we don't have translated versions yet.
  // Make locale pages for them, and replace the original with context.
  if (!page.context.locale) {
    deletePage(page);
    createPage({
      ...page,
      context: {
        locale: defaultLocale,
        contentfulLocale: contentfulLocale[defaultLocale],
        catalog: catalogs[defaultLocale],
        lastModified: new Date().toISOString(),
      },
    });
    supportedLanguages.forEach((locale) => {
      createPage({
        ...page,
        path: `/${locale}${page.path}`,
        context: {
          ...page.context,
          locale,
          contentfulLocale: contentfulLocale[locale],
          catalog: catalogs[locale],
          lastModified: new Date().toISOString(),
        },
      });
    });
  }
};
