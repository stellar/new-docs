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
import StellarDocsImage from "assets/images/og_developers.jpg";

export const Seo = ({
  title,
  description = "",
  path,
  omitPredicate = () => true,
  meta = [],
  link = [],
}) => {
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
        { property: "og:image", content: StellarDocsImage },

        { name: "twitter:card", content: "summary" },
        { property: "twitter:site", content: "@StellarOrg" },
        { property: "twitter:creator", content: "@StellarOrg" },
      ]
        .filter(omitPredicate)
        .concat(meta)}
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
      ]
        .filter(omitPredicate)
        .concat(link)}
    />
  );
};

Seo.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  omitPredicate: PropTypes.func,
  link: PropTypes.arrayOf(PropTypes.object),
  meta: PropTypes.arrayOf(PropTypes.object),
};
