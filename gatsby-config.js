require("dotenv").config();
const {
  serializeLocale,
  query: sitemapQuery,
} = require("./buildHelpers/serializeSitemap");

// Determine what environment we're running in and what the URL is.
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://stellar.org",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;
const isProdBuild = NODE_ENV === "production";
const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

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
    siteUrl,
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {
        gatsbyRemarkPlugins: [
          "gatsby-remark-smartypants",
          {
            resolve: `gatsby-remark-prismjs`,
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
            resolve: `gatsby-remark-prismjs`,
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
          failOnError: isProdBuild,
          failOnWarning: isProdBuild,
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
      // Make sure each locale's sitemap is present in static/robots.txt
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap.es.xml",
        query: sitemapQuery,
        serialize: serializeLocale("es"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://medium.com/feed/stellar-community`,
        name: `MediumBlog`,
      },
    },
  ],
};
