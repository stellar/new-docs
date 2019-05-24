import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { THEME } from "constants/styles";

import { PreloadedCatalogContext } from "helpers/translate";

import GlobalStyles from "basics/GlobalStyles";

const Providers = ({ children, preloadedCatalogs }) => (
  <ThemeProvider theme={THEME}>
    <PreloadedCatalogContext.Provider value={preloadedCatalogs}>
      <GlobalStyles />
      {children}
    </PreloadedCatalogContext.Provider>
  </ThemeProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  preloadedCatalogs: PropTypes.object,
};

export default Providers;
