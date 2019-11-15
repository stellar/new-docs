import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import faviconIco from "assets/favicon/favicon.ico";
import favicon16 from "assets/favicon/favicon-16x16.png";
import favicon32 from "assets/favicon/favicon-32x32.png";
import favicon96 from "assets/favicon/favicon-96x96.png";
import favicon180 from "assets/favicon/apple-icon-180x180.png";
import favicon192 from "assets/favicon/android-chrome-192x192.png";
import favicon512 from "assets/favicon/android-chrome-512x512.png";
import StellarLogo from "assets/images/stellar-logo.png";

export const Seo = ({ title, description = "", previewImage, path }) => {
  const data = useStaticQuery(graphql`
    query Metadata {
      site {
        siteMetadata {
          description
          title
          siteUrl
        }
      }
    }
  `);

  const {
    description: defaultDescription,
    title: defaultTitle,
    siteUrl,
  } = data.site.siteMetadata;
  const url = path ? siteUrl + path : siteUrl;
  const finalDescription = description || defaultDescription;

  const isFullPath = (previewImage || "").startsWith("http");

  let previewImageUrl = siteUrl + StellarLogo;
  if (previewImage) {
    previewImageUrl = isFullPath ? previewImage : siteUrl + previewImage;
  }

  return (
    <Helmet
      title={title}
      defaultTitle={defaultTitle}
      meta={[
        { name: "description", content: finalDescription },

        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
        { property: "og:description", content: finalDescription },
        { property: "og:url", content: url },
        { property: "og:image", content: previewImageUrl },

        { name: "twitter:card", content: "summary" },
        { property: "twitter:site", content: "@StellarOrg" },
        { property: "twitter:creator", content: "@StellarOrg" },
      ]}
      link={[
        { rel: "canonical", href: url },
        {
          rel: "shortcut icon",
          href: faviconIco,
          type: "image/x-icon",
        },
        { rel: "icon", href: favicon16, type: "image/x-icon" },
        { rel: "icon", href: favicon32, type: "image/x-icon" },
        { rel: "icon", href: favicon96, type: "image/x-icon" },
        {
          rel: "apple-touch-icon",
          href: favicon180,
          type: "image/x-icon",
        },
        { rel: "icon", href: favicon192, type: "image/x-icon" },
        { rel: "icon", href: favicon512, type: "image/x-icon" },
      ]}
    />
  );
};

Seo.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.node,
  previewImage: PropTypes.string,
  description: PropTypes.node,
};
