import React from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import { t } from "@lingui/macro";

import { NAV_THEMES, PALETTE } from "constants/styles";

import translate, { setup as setupI18n } from "helpers/translate";

import { Link } from "basics/Links";

import Footer from "components/Footer";
import Locale from "components/Locale";
import Navigation from "components/Navigation";
import { SideNavProvider } from "components/SideNav";
import { StickyNavProvider } from "components/StickyNavContent";

import { Seo } from "./Seo";

const contentId = "content";
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

const navTheme = NAV_THEMES.default;
const theme = {
  body: PALETTE.white,
};

export const DocsBase = (props) => {
  const {
    pageContext,
    title,
    description = "",
    children,
    previewImage,
  } = props;

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
      <ThemeProvider theme={(orig) => ({ ...orig, ...theme, ...navTheme })}>
        <Navigation scrollOpacity={0} />
      </ThemeProvider>
      <ThemeProvider theme={(orig) => ({ ...orig, ...theme, ...navTheme })}>
        <SideNavProvider>
          <StickyNavProvider>{children}</StickyNavProvider>
        </SideNavProvider>
      </ThemeProvider>
      <Footer />
    </Locale>
  );
};

DocsBase.propTypes = {
  children: PropTypes.node,
  metadata: PropTypes.shape({
    title: PropTypes.node.isRequired,
    description: PropTypes.node.isRequired,
  }).isRequired,
  title: PropTypes.node,
  previewImage: PropTypes.string,
  description: PropTypes.node,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};
