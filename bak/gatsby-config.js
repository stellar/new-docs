require("dotenv").config();

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  siteMetadata: {
    title: "Stellar - Docs dev environment",
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {
        gatsbyRemarkPlugins: [
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              showLineNumbers: true,
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        stages: ["build-javascript", "develop"],
        options: {
          failOnError: isProd,
          failOnWarning: isProd,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/src/`,
      },
    },
  ],
};
