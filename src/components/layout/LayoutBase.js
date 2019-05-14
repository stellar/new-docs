import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled, { ThemeProvider } from "styled-components";

import { setup as setupI18n } from "helpers/translate";

import favicon from "assets/favicon/favicon.ico";

import Locale from "components/Locale";
import Navigation, { defaultTheme } from "components/Navigation";
import Footer from "components/Footer";

const El = styled.div`
  overflow: hidden;
  ${({ padNav }) => padNav && `padding-top: 5rem;`}
`;
const ModalTargetEl = styled.div.attrs({ id: "modal" })``;

/**
 * Written as a class component specifically so that `setupI18n` can be run
 * before the render method of any children.
 */
class LayoutBase extends React.Component {
  componentWillMount() {
    const { locale, catalog } = this.props.pageContext;
    setupI18n(locale, catalog);
  }
  render() {
    const {
      metadata,
      pageContext,
      description = "",
      children,
      navTheme = defaultTheme,
      scrollOpacity,
      padNav = true,
    } = this.props;
    return (
      <Locale
        language={pageContext.locale}
        catalog={pageContext.catalog}
        alternateUrls={pageContext.alternateUrls}
      >
        <Helmet>
          <title>{metadata.title}</title>
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
          <meta
            name="description"
            content={`${metadata.description}${description &&
              ` ${description}`}`}
          />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={metadata.siteUrl} />
        </Helmet>
        <ThemeProvider theme={(theme) => ({ ...theme, ...navTheme })}>
          <Navigation scrollOpacity={scrollOpacity} />
        </ThemeProvider>
        <El padNav={padNav}>{children}</El>
        <Footer />
        <ModalTargetEl />
      </Locale>
    );
  }
}

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string,
  navTheme: PropTypes.object,
  scrollOpacity: PropTypes.number,
  padNav: PropTypes.bool,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    catalog: PropTypes.object.isRequired,
  }).isRequired,
};

export default LayoutBase;
