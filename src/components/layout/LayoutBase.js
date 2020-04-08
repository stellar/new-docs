import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import { FONTS } from "constants/fonts";

import { Link } from "basics/Links";

import { Provider as SideNavProvider } from "components/SideNav";

import { Seo } from "./Seo";

const contentId = "content";
const ContentEl = styled.div.attrs({ id: contentId })``;
const SkipToContentEl = styled(Link).attrs({
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
  pageContext,
  title,
  description = "",
  previewImage,
  children,
  viewport = "width=device-width, initial-scale=1",
}) => (
  <>
    <Helmet
      link={FONTS.filter((font) => font.preload).flatMap((font) => ({
        rel: "preload",
        href: font.src[0].url,
        as: "font",
      }))}
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
      path={pageContext.urlPath}
    />
    <SkipToContentEl />
    <ContentEl>
      <SideNavProvider>{children}</SideNavProvider>
    </ContentEl>
  </>
);

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  previewImage: PropTypes.string,
  viewport: PropTypes.string,
  description: PropTypes.node,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
  }).isRequired,
};
