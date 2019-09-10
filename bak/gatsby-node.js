const Promise = require("bluebird");
const path = require("path");
const {
  createMdxPages,
  getFileName,
  getLocale,
} = require("./buildHelpers/createMdxPages");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  const filename = getFileName(node);
  if (filename) {
    // For any MDX files, we want to know if they have a locale associated with
    // them. Pull it from the filename.
    const locale = getLocale(filename);
    createNodeField({
      node,
      name: "locale",
      value: locale,
    });
  }
  if (node.internal.type === "Mdx" && node.fileAbsolutePath) {
    const value = path.parse(node.fileAbsolutePath.split("src/content")[1]).dir;
    createNodeField({
      node,
      name: "path",
      value,
    });
  }
};

// Build an object of catalogs keyed by the locale string.
// This happens during preBootstrap;
let catalogs;

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(
    `
      {
        allMdx {
          edges {
            node {
              id
              fileAbsolutePath
              fields {
                locale
                path
              }
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
};

// Enable absolute imports from `src/`
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: ["node_modules", "src"],
    },
  });
};
