import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { t } from "@lingui/macro";

import translate, { setup as setupI18n } from "helpers/translate";

import { Link } from "basics/Links";

import Locale from "components/Locale";

import { Seo } from "./Seo";

const contentId = "content";
const ContentEl = styled.div.attrs({ id: contentId })``;
const SkipToContentEl = styled(Link).attrs({
  href: `#${contentId}`,
  children: translate._(t`Skip to content`),
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

const LayoutBase = ({
  pageContext,
  title,
  description = "",
  previewImage,
  navigation,
  children,
}) => {
  React.useEffect(() => {
    setupI18n(pageContext.locale);
  }, [pageContext.locale]);

  return (
    <Locale
      language={pageContext.locale}
      alternateUrls={pageContext.alternateUrls}
    >
      <Seo
        title={title}
        description={description}
        previewImage={previewImage}
        path={pageContext.urlPath}
      />
      <SkipToContentEl />
      {navigation}
      <ContentEl>{children}</ContentEl>
    </Locale>
  );
};

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  navigation: PropTypes.node.isRequired,
  title: PropTypes.node,
  previewImage: PropTypes.string,
  description: PropTypes.node,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

export default LayoutBase;
