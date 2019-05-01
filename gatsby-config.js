require("dotenv").config();

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
};

if (!contentfulConfig.spaceId || !contentfulConfig.accessToken) {
  throw new Error(
    "CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN need to be provided in .env.",
  );
}

module.exports = {
  siteMetadata: {
    title: "Stellar - Develop the world's new financial system",
    description:
      "Stellar is an open platform for building financial products that connect people everywhere.",
  },
  pathPrefix: "/",
  plugins: [
    "gatsby-mdx",
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/`,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
  ],
};
