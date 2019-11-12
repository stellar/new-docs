import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from "styled-components";
import { t } from "@lingui/macro";

import { NAV_THEMES, PALETTE } from "constants/styles";

import translate, { setup as setupI18n } from "helpers/translate";

import faviconIco from "assets/favicon/favicon.ico";
import favicon16 from "assets/favicon/favicon-16x16.png";
import favicon32 from "assets/favicon/favicon-32x32.png";
import favicon96 from "assets/favicon/favicon-96x96.png";
import favicon180 from "assets/favicon/apple-icon-180x180.png";
import favicon192 from "assets/favicon/android-chrome-192x192.png";
import favicon512 from "assets/favicon/android-chrome-512x512.png";
import StellarLogo from "assets/images/stellar-logo.png";

import { Link } from "basics/Links";
import { Row, Column, Container } from "basics/Grid";

import Footer from "components/Footer";
import Locale from "components/Locale";
import Navigation from "components/Navigation";
import { SideNavProvider } from "components/SideNav";
import { StickyNavProvider } from "components/StickyNavContent";

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

const ContainerEl = styled(Container)`
  font-family: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
`;

export const DocsBase = (props) => {
  const {
    metadata,
    pageContext,
    title,
    description = "",
    left,
    center,
    right,
    previewImage,
  } = props;

  const siteUrl =
    pageContext && pageContext.urlPath
      ? metadata.siteUrl + pageContext.urlPath
      : metadata.siteUrl;
  const isContentful = pageContext && pageContext.contentfulLocale;
  let previewImageUrl;

  React.useEffect(() => {
    setupI18n(pageContext.locale);
  }, [pageContext.locale]);

  if (previewImage) {
    if (isContentful) {
      previewImageUrl = previewImage;
    } else {
      previewImageUrl = metadata.siteUrl + previewImage;
    }
  }

  return (
    <Locale
      language={pageContext.locale}
      alternateUrls={pageContext.alternateUrls}
    >
      <Helmet
        title={title}
        defaultTitle={metadata.title}
        meta={[
          {
            name: "description",
            content: description || metadata.description,
          },
          { property: "og:title", content: title || metadata.title },
          { property: "og:type", content: "website" },
          {
            property: "og:description",
            content: description || metadata.description,
          },
          { property: "og:url", content: siteUrl },
          {
            property: "og:image",
            content: previewImageUrl || StellarLogo,
          },
          {
            name: "twitter:card",
            content: "summary",
          },
          {
            property: "twitter:site",
            content: "@StellarOrg",
          },
          {
            property: "twitter:creator",
            content: "@StellarOrg",
          },
        ]}
        link={[
          { rel: "canonical", href: siteUrl },
          { rel: "shortcut icon", href: faviconIco, type: "image/x-icon" },
          { rel: "icon", href: favicon16, type: "image/x-icon" },
          { rel: "icon", href: favicon32, type: "image/x-icon" },
          { rel: "icon", href: favicon96, type: "image/x-icon" },
          { rel: "apple-touch-icon", href: favicon180, type: "image/x-icon" },
          { rel: "icon", href: favicon192, type: "image/x-icon" },
          { rel: "icon", href: favicon512, type: "image/x-icon" },
        ]}
      />
      <SkipToContentEl />
      <ThemeProvider theme={(orig) => ({ ...orig, ...theme, ...navTheme })}>
        <Navigation scrollOpacity={0} />
      </ThemeProvider>
      <ThemeProvider theme={(orig) => ({ ...orig, ...theme, ...navTheme })}>
        <SideNavProvider>
          <StickyNavProvider>
            <ContainerEl id={contentId}>
              <Row>
                <Column md={3} lg={3}>
                  {left}
                </Column>
                {/*
                  We want the right hand side to appear above content on mobile
                */}
                <Column md={{ hide: true }}>{right}</Column>
                <Column md={7}>{center}</Column>
                <Column md={2}>{right}</Column>
              </Row>
            </ContainerEl>
          </StickyNavProvider>
        </SideNavProvider>
      </ThemeProvider>
      <Footer />
    </Locale>
  );
};

DocsBase.propTypes = {
  left: PropTypes.node,
  center: PropTypes.node,
  right: PropTypes.node,
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
