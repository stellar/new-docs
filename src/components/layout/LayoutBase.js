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

class LayoutBase extends React.Component {
  componentDidMount() {
    const { locale } = this.props.pageContext;
    setupI18n(locale);
  }
  render() {
    const {
      metadata,
      pageContext,
      title,
      description = "",
      children,
      navTheme = defaultTheme,
      scrollOpacity,
      padNav = true,
    } = this.props;
    return (
      <Locale
        language={pageContext.locale}
        alternateUrls={pageContext.alternateUrls}
      >
        <Helmet title={title} defaultTitle={metadata.title}>
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
          <meta
            name="description"
            content={`${metadata.description}${description &&
              ` ${description}`}`}
          />
          <meta property="og:title" content={title || metadata.title} />
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
  title: PropTypes.string,
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
