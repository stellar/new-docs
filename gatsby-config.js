require("dotenv").config();
const {
  serializeLocale,
  query: sitemapQuery,
} = require("./buildHelpers/serializeSitemap");

// Determine what environment we're running in and what the URL is.
const { IS_BUILD, SITE_URL } = require("./buildHelpers/env");

// Set up Contentful configuration
const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  host: process.env.CONTENTFUL_HOST || "cdn.contentful.com",
  downloadLocal: true,
};
if (!contentfulConfig.spaceId || !contentfulConfig.accessToken) {
  throw new Error(
    "CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN need to be provided in .env.",
  );
}

// Gatsby config
module.exports = {
  siteMetadata: {
    title: "Stellar - Develop the world's new financial system",
    description:
      "Stellar is an open platform for building financial products that connect people everywhere.",
    siteUrl: SITE_URL,
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: "gatsby-source-git",
      options: {
        name: "docs",
        remote: "https://github.com/stellar/new-docs.git",
        branch: "master",
        patterns: ["**/*.mdx", "**/metadata.json"],
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
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
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
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
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        stages: ["build-javascript", "develop"],
        options: {
          failOnError: IS_BUILD,
          failOnWarning: IS_BUILD,
        },
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap.xml",
        query: sitemapQuery,
        serialize: serializeLocale("en"),
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        path: `${__dirname}/src/assets/`,
        rule: {
          include: [/icons/, /svg\//],
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/src/content/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "case-studies",
        path: `${__dirname}/src/case-studies/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "explainers",
        path: `${__dirname}/src/explainers/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets/images/`,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    {
      resolve: "gatsby-source-rss-feed",
      options: {
        url: "https://medium.com/feed/stellar-community",
        name: "MediumBlog",
      },
    },
    "gatsby-plugin-folder-metadata",
    // TODO: Keep an eye on Gatsby's CSP support and remove `unsafe-inline`
    // https://github.com/bejamas/gatsby-plugin-csp/issues/11
    // https://github.com/gatsbyjs/gatsby/issues/10890
    // This plugin isn't working for gatsby scripts, and MDX necessitates
    // 'unsafe-inline' at the moment.
    // {
    //   resolve: "gatsby-plugin-csp",
    //   options: {
    //     mergeDefaultDirectives: false,
    //     mergeStyleHashes: false,
    //     directives: {
    //     },
    //   },
    // },
  ].filter(Boolean),
};
