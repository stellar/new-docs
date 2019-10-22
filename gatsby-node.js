const Promise = require("bluebird");
const path = require("path");
const execa = require("execa");

const { FEATURE_FLAGS } = require("./buildHelpers/env");
const { getLocale } = require("./buildHelpers/createMdxPages");
const {
  createContentfulPages,
  queryFragment: blogPostsFragment,
} = require("./buildHelpers/createContentfulPages");
const {
  createContentfulBlog,
  queryFragment: blogListFragment,
} = require("./buildHelpers/createContentfulBlog");
const {
  createContentfulNewsletter,
  queryFragment: newsletterFragment,
} = require("./buildHelpers/createContentfulNewsletter");
const {
  createDocsPages,
  queryFragment: docsQueryFragment,
} = require("./buildHelpers/createDocsPages");
const {
  createCaseStudies,
  queryFragment: caseStudyFragment,
} = require("./buildHelpers/buildCaseStudies");
const {
  createExplainers,
  queryFragment: explainersFragment,
} = require("./buildHelpers/buildExplainers");
const {
  createMiscContent,
  queryFragment: miscContentFragment,
} = require("./buildHelpers/buildMiscContent");
const {
  createProjectDirectory,
  queryFragment: projectDirectoryQueryFragment,
} = require("./buildHelpers/buildProjectDirectory");
const {
  contentfulLocale,
  defaultLocale,
  supportedLanguages,
} = require("./buildHelpers/i18n");

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
        ${caseStudyFragment}
        ${explainersFragment}
        ${miscContentFragment}
        ${blogPostsFragment}
        ${blogListFragment}
        ${newsletterFragment}
        ${projectDirectoryQueryFragment}
        ${FEATURE_FLAGS.docs ? docsQueryFragment : ""}
      }
    `,
  );
  if (result.errors) {
    console.log(result.errors);
    return Promise.reject(result.errors);
  }
  const { data: allQueries } = result;

  createCaseStudies({ actions, allQueries });
  createExplainers({ actions, allQueries });
  createMiscContent({ actions, allQueries });

  createContentfulPages({ actions, allQueries });
  createContentfulBlog({ actions, allQueries });

  createContentfulNewsletter({ actions, allQueries });

  createProjectDirectory({ actions, allQueries });

  if (FEATURE_FLAGS.docs) {
    const docs = result.data.docs.edges;
    createDocsPages({ actions, docs });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  // All of custom page generation adds a `locale` key to context, but components
  // sourced from `pages/` don't go through any of those mechanisms. Add
  // international routes for those.
  // Possible future TODO: remove pages/, load those components with i18n helper.
  if (!page.context.locale) {
    deletePage(page);
    createPage({
      ...page,
      context: {
        locale: defaultLocale,
        urlPath: page.path,
        contentfulLocale: contentfulLocale[defaultLocale],
        lastModified: new Date().toISOString(),
        // List alternate pages so we can include head <link>s to them
        alternateUrls: supportedLanguages
          .filter((l) => l !== defaultLocale)
          .map((l) => ({
            locale: l,
            path: `/${l}${page.path}`,
          })),
      },
    });
    supportedLanguages.forEach((locale) => {
      createPage({
        ...page,
        path: `/${locale}${page.path}`,
        context: {
          ...page.context,
          locale,
          urlPath: page.path,
          contentfulLocale: contentfulLocale[locale],
          lastModified: new Date().toISOString(),
          // List alternate pages so we can include head <link>s to them
          alternateUrls: supportedLanguages
            .filter((l) => l !== locale)
            .map((l) => ({
              locale: l,
              path: l === defaultLocale ? page.path : `/${l}${page.path}`,
            })),
        },
      });
    });
  }
};

// Enable absolute imports from `src/`
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: ["node_modules", "src"],
    },
  });
};

// Build lingui catalogs
exports.onPreBootstrap = async () => {
  console.log("[i18n] Building Lingui catalogs…");
  await execa("yarn", ["compile-i18n"]);
  console.log("[i18n] Done!");
};
