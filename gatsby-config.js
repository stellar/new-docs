require("dotenv").config();
const {
  serializeLocale,
  query: sitemapQuery,
} = require("./buildHelpers/serializeSitemap");

// Determine what environment we're running in and what the URL is.
const IS_BUILD = process.env.npm_lifecycle_event === "build";
const IS_LOCAL = process.env.PWD !== "/app/src";
const SITE_URL = IS_LOCAL
  ? "http://localhost:8000"
  : process.env.URL || "https://developers.stellar.org";

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
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-remark-images",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-mermaid",
            options: {
              theme: "neutral",
              fontFamily: '"IBM Plex Sans", Arial, sans-serif',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
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
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs-images",
        path: `${__dirname}/content/docs/web-assets/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs",
        path: `${__dirname}/content/`,
      },
    },
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
