import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from "styled-components";

import { NAV_HEIGHT, NAV_THEMES } from "constants/styles";

import { setup as setupI18n } from "helpers/translate";

import faviconIco from "assets/favicon/favicon.ico";
import favicon16 from "assets/favicon/favicon-16x16.png";
import favicon32 from "assets/favicon/favicon-32x32.png";
import favicon96 from "assets/favicon/favicon-96x96.png";
import favicon180 from "assets/favicon/apple-icon-180x180.png";
import favicon192 from "assets/favicon/android-chrome-192x192.png";
import favicon512 from "assets/favicon/android-chrome-512x512.png";
import StellarLogo from "assets/images/stellar-logo.png";

import Locale from "components/Locale";
import Navigation from "components/Navigation";
import Footer from "components/Footer";

const El = styled.div`
  overflow: hidden;
  ${({ padNav }) => padNav && `padding-top: 5rem;`}
`;
const ModalTargetEl = styled.div.attrs({ id: "modal" })``;

class LayoutBase extends React.Component {
  subpageHeading = null;
  state = {
    scrollLimit: 1,
  };

  componentDidMount() {
    const { locale } = this.props.pageContext;
    setupI18n(locale);

    if (this.props.isNavTransparent) {
      if (!this.heading && process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(
          "[LayoutBase]: `isNavTransparent` is true but there's no `leading` element. Did you forget the subpage header?",
        );
        return;
      }
      const { height } = this.heading.getBoundingClientRect();
      this.setState({ scrollLimit: height - NAV_HEIGHT });
    }
  }
  render() {
    const {
      metadata,
      pageContext,
      title,
      description = "",
      children,
      leading = null,
      trailing = null,
      previewImage,
      navTheme = NAV_THEMES.default,
      isNavTransparent = false,
    } = this.props;

    const siteUrl =
      pageContext && pageContext.urlPath
        ? metadata.siteUrl + pageContext.urlPath
        : metadata.siteUrl;

    const previewImageUrl = previewImage && metadata.siteUrl + previewImage;

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
            { rel: "shortcut icon", href: faviconIco, type: "image/x-icon" },
            { rel: "icon", href: favicon16, type: "image/x-icon" },
            { rel: "icon", href: favicon32, type: "image/x-icon" },
            { rel: "icon", href: favicon96, type: "image/x-icon" },
            { rel: "apple-touch-icon", href: favicon180, type: "image/x-icon" },
            { rel: "icon", href: favicon192, type: "image/x-icon" },
            { rel: "icon", href: favicon512, type: "image/x-icon" },
          ]}
        />
        <ThemeProvider theme={(theme) => ({ ...theme, ...navTheme })}>
          <Navigation
            scrollOpacity={isNavTransparent ? this.state.scrollLimit : 0}
          />
        </ThemeProvider>
        <ThemeProvider theme={(theme) => ({ ...theme, ...navTheme })}>
          <El padNav={!isNavTransparent}>
            {leading &&
              React.cloneElement(leading, {
                scrollLimit: this.state.scrollLimit,
                ref: (node) => {
                  this.heading = node;
                },
              })}
            {children}
            {trailing}
          </El>
        </ThemeProvider>
        <Footer />
        <ModalTargetEl />
      </Locale>
    );
  }
}

LayoutBase.propTypes = {
  leading: PropTypes.node,
  children: PropTypes.node.isRequired,
  trailing: PropTypes.node,
  metadata: PropTypes.shape({
    title: PropTypes.node.isRequired,
    description: PropTypes.node.isRequired,
  }).isRequired,
  title: PropTypes.node,
  previewImage: PropTypes.string,
  description: PropTypes.node,
  navTheme: PropTypes.object,
  isNavTransparent: PropTypes.bool,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

export default LayoutBase;
