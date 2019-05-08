import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled, { ThemeProvider } from "styled-components";

import Locale from "../Locale";
import Navigation, { defaultTheme } from "../Navigation";
import Footer from "../Footer";

const El = styled.div``;

const LayoutBase = ({
  metadata,
  pageContext,
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
  }).isRequired,
  navTheme: PropTypes.object,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    catalog: PropTypes.object.isRequired,
  }).isRequired,
};

export default LayoutBase;
