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
    const value = path.parse(
      path.relative("./", node.fileAbsolutePath).split("docs")[1],
    ).dir;
    console.log(
      node.fileAbsolutePath,
      path.relative("./", node.fileAbsolutePath).split("docs")[1],
    );
    createNodeField({
      node,
      name: "path",
      value,
    });
  }
};

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
  console.log(mdxFiles);
  createMdxPages({ actions, mdxFiles });
};

// Enable absolute imports from `src/`
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: ["node_modules", "src"],
    },
  });
};
