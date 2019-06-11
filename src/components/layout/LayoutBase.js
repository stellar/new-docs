import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled, { ThemeProvider } from "styled-components";

import { NAV_HEIGHT, NAV_THEMES } from "constants/styles";

import { setup as setupI18n } from "helpers/translate";

import favicon from "assets/favicon/favicon.ico";

import Locale from "components/Locale";
import Navigation from "components/Navigation";
import Footer from "components/Footer";
import SubPageHeading from "components/SubPageHeading";

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
      subpage = null,
      children,
      navTheme = NAV_THEMES.default,
      isNavTransparent = false,
    } = this.props;

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
              content: `${metadata.description}${description &&
                ` ${description}`}`,
            },
            { property: "og:title", content: title || metadata.title },
            { property: "og:type", content: "website" },
            { property: "og:url", content: metadata.siteUrl },
          ]}
          link={[{ rel: "shortcut icon", href: favicon, type: "image/x-icon" }]}
        />
        <ThemeProvider theme={(theme) => ({ ...theme, ...navTheme })}>
          <Navigation
            scrollOpacity={isNavTransparent ? this.state.scrollLimit : 0}
          />
        </ThemeProvider>
        <El padNav={!isNavTransparent}>
          {subpage && (
            <SubPageHeading
              scrollLimit={this.state.scrollLimit}
              ref={(node) => {
                this.heading = node;
              }}
              {...subpage}
            />
          )}
          {children}
        </El>
        <Footer />
        <ModalTargetEl />
      </Locale>
    );
  }
}

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.shape({
    title: PropTypes.node.isRequired,
    description: PropTypes.node.isRequired,
  }).isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  subpage: PropTypes.object,
  navTheme: PropTypes.object,
  isNavTransparent: PropTypes.bool,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

export default LayoutBase;
