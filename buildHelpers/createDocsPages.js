const path = require("path");
const { defaultLocale } = require("./i18n");
const { normalizeRoute } = require("./routes");

const pathRegex = /^src(.*)\..*$/;
const buildPathFromFile = ({ relativePath }) => {
  // Strip `index` so that `index.mdx` files come through with just their
  // relative path.
  const match = pathRegex.exec(relativePath.replace("index", ""));
  return normalizeRoute(match[1]);
};

const REFERENCE_ROOT = "src/docs/reference";
const isReference = (doc) => doc.relativeDirectory.includes(REFERENCE_ROOT);

const createDocsPages = ({ actions, docs }) => {
  // TODO: These pages don't support internationalization. This should be
  // refactored so that it can use createI18nPages.
  const docTemplate = path.resolve(".", "src", "templates", "Documentation.js");
  const apiTemplate = path.resolve(".", "src", "templates", "ApiReference.js");

  const allDocs = docs.map(({ node }) => node);

  const apiReference = allDocs.filter((doc) => isReference(doc));
  const documentation = allDocs.filter((doc) => !isReference(doc));

  documentation.forEach((doc) => {
    actions.createPage({
      path: buildPathFromFile(doc),
      component: docTemplate,
      context: {
        id: doc.childMdx.id,
        locale: defaultLocale,
        // None of these have translations set up. If we translate them in
        // the future, we'll have to revisit this.
      },
    });
  });
  actions.createPage({
    path: "docs/api",
    component: apiTemplate,
    context: {
      ids: apiReference.map(({ childMdx }) => childMdx.id),
      locale: defaultLocale,
    },
  });
};

const queryFragment = `
  docs: allFile(filter: {
    sourceInstanceName: { eq: "docs" },
    extension: { eq: "mdx" }
  }) {
    edges {
      node {
        childMdx {
          id
        }
        relativePath
        relativeDirectory
        fields {
          metadata {
            data {
              order
              title
            }
          }
        }
      }
    }
  }
`;

exports.createDocsPages = createDocsPages;
exports.queryFragment = queryFragment;
