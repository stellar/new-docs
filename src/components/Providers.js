import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { THEME } from "constants/styles";

import { PreloadedCatalogContext } from "helpers/translate";

import GlobalStyles from "basics/GlobalStyles";
import FeatureFlags from "contexts/featureFlags";

const Providers = ({ children, featureFlags, preloadedCatalogs }) => (
  <ThemeProvider theme={THEME}>
    <FeatureFlags flags={featureFlags}>
      <PreloadedCatalogContext.Provider value={preloadedCatalogs}>
        <GlobalStyles />
        {children}
      </PreloadedCatalogContext.Provider>
    </FeatureFlags>
  </ThemeProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  preloadedCatalogs: PropTypes.object,
};

export default Providers;
