import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled, { ThemeProvider } from "styled-components";

import favicon from "../../assets/favicon/favicon.ico";

import Locale from "../Locale";
import Navigation, { defaultTheme } from "../Navigation";
import Footer from "../Footer";

const El = styled.div``;

const LayoutBase = ({
  metadata,
  pageContext,
  description = "",
  children,
  navTheme = defaultTheme,
}) => {
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
          content={`${metadata.description}${description && ` ${description}`}`}
        />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.siteUrl} />
      </Helmet>
      <ThemeProvider theme={(theme) => ({ ...theme, ...navTheme })}>
        <Navigation />
      </ThemeProvider>
      <El>{children}</El>
      <Footer />
    </Locale>
  );
};

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string,
  navTheme: PropTypes.object,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    catalog: PropTypes.object.isRequired,
  }).isRequired,
};

export default LayoutBase;
