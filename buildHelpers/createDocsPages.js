const path = require("path");
const { defaultLocale } = require("./i18n");

const buildPathFromMetadata = (metadata) => {
  const pathSegments = [];
  let currentMetadata = metadata;
  while (currentMetadata) {
    pathSegments.push(currentMetadata.data.url);
    currentMetadata = currentMetadata.parent;
  }
  return pathSegments.reverse().join("/");
};

const REFERENCE_ROOT = "src/documentation/reference";
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
      path: buildPathFromMetadata(doc.fields.metadata),
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

// GraphQL doesn't support recursive queries!! womp womp. If we end up with more
// deeply nested folders in the docs, we'll need to update this (which sucks)
const metadataFragment = `
data {
  url
  order
  title
}
parent {
  data {
    url
    order
    title
  }
  parent {
    data {
      url
      order
      title
    }
    parent {
      data {
        url
        order
        title
      }
    }
  }
}`;

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
            ${metadataFragment}
          }
        }
      }
    }
  }
`;

exports.createDocsPages = createDocsPages;
exports.queryFragment = queryFragment;
