const path = require("path");

const { defaultLocale, supportedLanguages } = require("./buildHelpers/i18n");
const {
  createDocsPages,
  queryFragment: docsQueryFragment,
} = require("./buildHelpers/createDocsPages");

const getLocale = (filename) => {
  const nameSections = filename.split(".");
  const length = nameSections.length;

  // If there are 2+ sections after splitting on `.` (excluding file extension)
  // and the last one is in our list of supported languages, that's our locale
  if (length >= 2 && supportedLanguages.includes(nameSections[length - 1])) {
    return nameSections[length - 1];
  }
  return defaultLocale;
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx" && node.fileAbsolutePath) {
    const locale = getLocale(path.parse(node.fileAbsolutePath).base);
    createNodeField({
      node,
      name: "locale",
      value: locale,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(
    `
      {
        ${docsQueryFragment}
      }
    `,
  );
  if (result.errors) {
    console.log(result.errors);
    return Promise.reject(result.errors);
  }

  const docs = result.data.docs.edges;
  createDocsPages({ actions, docs });
};

// Enable absolute imports from `src/`
exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: ["node_modules", "src"],
    },
    plugins: [
      plugins.define({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          IS_BETA: JSON.stringify(process.env.IS_BETA),
          CONTEXT: JSON.stringify(process.env.CONTEXT),
          URL: JSON.stringify(process.env.URL),
          DEPLOY_PRIME_URL: JSON.stringify(process.env.DEPLOY_PRIME_URL),
        },
      }),
    ],
  });
};
