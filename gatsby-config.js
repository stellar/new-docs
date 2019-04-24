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
  },
  pathPrefix: "/gatsby-contentful-starter",
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
  ],
};
