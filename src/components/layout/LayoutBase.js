import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import { BasicLink } from "basics/Links";
import { Seo } from "./Seo";

const contentId = "content";
const ContentEl = styled.div.attrs({ id: contentId })``;
const SkipToContentEl = styled(BasicLink).attrs({
  href: `#${contentId}`,
  children: `Skip to content`,
})`
  position: absolute;
  left: -1000rem;

  &:focus,
  &:active {
    position: fixed;
    left: 1rem;
    top: 1rem;
    padding: 1rem;
    z-index: 1000;
    color: white;
    text-shadow: 0 0 4px black;
  }
`;

export const LayoutBase = ({
  path,
  title,
  description = "",
  previewImage,
  children,
  viewport = "width=device-width, initial-scale=1",
  omitSeoHeadersPredicate,
  seo = {},
}) => (
  <>
    <Helmet
      link={[
        { rel: "stylesheet", type: "text/css", href: "/fonts.css" },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "/docsearch-stellar.css",
        },
      ]}
      meta={[
        {
          name: "viewport",
          content: viewport,
        },
      ]}
    />
    <Seo
      title={title}
      description={description}
      previewImage={previewImage}
      path={path}
      omitPredicate={omitSeoHeadersPredicate}
      link={seo.link}
      meta={seo.meta}
    />
    <SkipToContentEl />
    <ContentEl>{children}</ContentEl>
  </>
);

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  previewImage: PropTypes.string,
  viewport: PropTypes.string,
  description: PropTypes.node,
  path: PropTypes.string.isRequired,
  omitSeoHeadersPredicate: PropTypes.func,
  seo: PropTypes.shape({
    link: PropTypes.array,
    meta: PropTypes.array,
  }),
};
