import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import { FONTS } from "constants/fonts";
import { PERFORMANCE_MARKS } from "constants/performanceMarks";

import { emitMetric } from "helpers/metrics";
import { mark, measure } from "helpers/performance";

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
  pageContext,
  title,
  description = "",
  previewImage,
  children,
  viewport = "width=device-width, initial-scale=1",
}) => {
  mark(PERFORMANCE_MARKS.renderLayout);
  React.useEffect(() => {
    const timing = measure(PERFORMANCE_MARKS.renderLayout);
    emitMetric("page rendered", {
      ...timing,
      page: window.location.pathname,
    });
  });
  return (
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
      <ContentEl>{children}</ContentEl>
    </>
  );
};

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
