const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve(".", "src", "templates", "BlogPost.js");

    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `,
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allContentfulBlogPost.edges;
        posts.forEach((post) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          });
        });
      }),
    );
  });
};

const defaultLocale = "en";
const supportedLanguages = ["en", "es"];
const skipPatterns = [];
const contentfulLocale = {
  en: "en-US",
  es: "es",
};
const catalogs = supportedLanguages.reduce((accum, locale) => {
  accum[locale] = require(`./src/locale/${locale}/messages.js`);
  return accum;
}, {});

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // For any page without a locale (that shouldn't be skipped), create a new
  // page for each supported local.
  if (
    (!page.context || !page.context.locale) &&
    !skipPatterns.some((regex) => regex.test(path))
  ) {
    deletePage(page);
    createPage({
      ...page,
      context: {
        locale: defaultLocale,
        contentfulLocale: contentfulLocale[defaultLocale],
        catalog: catalogs[defaultLocale],
      },
    });
    supportedLanguages.forEach((locale) => {
      console.log("created", `/${locale}${page.path}`);
      createPage({
        ...page,
        path: `/${locale}${page.path}`,
        context: {
          ...page.context,
          locale,
          contentfulLocale: contentfulLocale[locale],
          catalog: catalogs[locale],
        },
      });
    });
  }
};
