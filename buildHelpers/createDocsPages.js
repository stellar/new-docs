const path = require("path");
const { defaultLocale } = require("./i18n");
const {
  buildRoute,
  buildPathFromFile,
  normalizeRoute,
  REFERENCE_ROOT,
  DOCS_ROOT,
} = require("./routes");

const isReference = (doc) => {
  const pathSegments = doc.relativeDirectory.split("/");
  const parentDirectory = pathSegments[0];

  return parentDirectory.includes(REFERENCE_ROOT);
};

const createDocsPages = ({ actions, docs }) => {
  // TODO: These pages don't support internationalization. This should be
  // refactored so that it can use createI18nPages.
  const docTemplate = path.resolve(".", "src", "templates", "Documentation.js");
  const apiTemplate = path.resolve(".", "src", "templates", "ApiReference.js");
  const apiSeoTemplate = path.resolve(
    ".",
    "src",
    "templates",
    "SingleApiReference.js",
  );

  const allDocs = docs.map(({ node }) => node);

  const apiReference = allDocs.filter((doc) => isReference(doc));
  const documentation = allDocs.filter((doc) => !isReference(doc));

  documentation.forEach((doc) => {
    const docPath = buildRoute(
      defaultLocale,
      buildPathFromFile(doc.relativePath),
    );
    actions.createPage({
      path: docPath,
      component: docTemplate,
      context: {
        mdxId: doc.childMdx.id,
        urlPath: docPath,
        locale: defaultLocale,
        name: doc.name,
        lastModified: doc.modifiedTime,
        relativeDirectory: doc.relativeDirectory,
        rootDir: DOCS_ROOT,
        // None of these have translations set up. If we translate them in
        // the future, we'll have to revisit this.
      },
    });
  });
  const apiRefRoute = buildRoute(defaultLocale, "api");
  const apiRefDocIds = apiReference.map(({ childMdx }) => childMdx.id);
  actions.createPage({
    path: apiRefRoute,
    matchPath: normalizeRoute(`${apiRefRoute}/*`),
    component: apiTemplate,
    context: {
      urlPath: apiRefRoute,
      ids: apiRefDocIds,
      locale: defaultLocale,
    },
  });
  apiReference.forEach((ref) => {
    const refPath = buildRoute(
      defaultLocale,
      "no-js",
      ref.relativeDirectory === DOCS_ROOT
        ? "/docs/"
        : buildPathFromFile(ref.relativePath),
    );
    actions.createPage({
      path: refPath,
      component: apiSeoTemplate,
      context: {
        urlPath: refPath,
        docId: ref.childMdx.id,
        ids: apiRefDocIds,
        lastModified: ref.modifiedTime,
        locale: defaultLocale,
      },
    });
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
        modifiedTime(formatString: "YYYY-MM-DD")
        name
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
exports.buildPathFromFile = buildPathFromFile;
