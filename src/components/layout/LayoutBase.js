import React from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { t } from "@lingui/macro";

import { NAV_HEIGHT, NAV_THEMES, THEME } from "constants/styles";

import translate, { setup as setupI18n } from "helpers/translate";

import { Link } from "basics/Links";

import Locale from "components/Locale";
import Navigation from "components/Navigation";
import Footer from "components/Footer";

import { Seo } from "./Seo";

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
  }
`;

const El = styled.div`
  position: relative;
  ${({ padNav }) => padNav && `padding-top: 5rem;`}
`;
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

class LayoutBase extends React.Component {
  state = {
    scrollLimit: 1,
  };

  componentDidMount() {
    const { locale } = this.props.pageContext;
    setupI18n(locale);

    if (this.props.isNavTransparent) {
      if (process.env.NODE_ENV !== "production" && !this.props.leading) {
        // eslint-disable-next-line no-console
        console.error(
          "[LayoutBase]: `isNavTransparent` is true but there's no `leading` element. Did you forget the subpage header?",
        );
        return;
      }
      if (process.env.NODE_ENV !== "production" && !this.heading) {
        // eslint-disable-next-line no-console
        console.error(
          "[LayoutBase]: `isNavTransparent` is true and there's a `leading` prop, but there's no node for the `leading` element. Did you forget to `forwardRef`?",
        );
        return;
      }
      const { height } = this.heading.getBoundingClientRect();
      this.setState({
        scrollLimit: height - NAV_HEIGHT,
      });
    }
  }

  render() {
    const {
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
        <ThemeProvider theme={{ ...THEME, ...navTheme }}>
          <Navigation
            scrollOpacity={isNavTransparent ? this.state.scrollLimit : 0}
          />
        </ThemeProvider>
        <ThemeProvider theme={{ ...THEME, ...navTheme }}>
          <>
            <GlobalStyles />
            <El id={contentId} padNav={!isNavTransparent}>
              {leading &&
                React.cloneElement(leading, {
                  scrollLimit: this.state.scrollLimit,
                  ref: (node) => {
                    this.heading = node;

                    const { ref } = leading;
                    if (ref) {
                      ref.current = node;
                    }
                    return ref;
                  },
                })}
              {children}
              {trailing}
            </El>
          </>
        </ThemeProvider>
        <Footer />
      </Locale>
    );
  }
}

LayoutBase.propTypes = {
  leading: PropTypes.node,
  children: PropTypes.node.isRequired,
  trailing: PropTypes.node,
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
