import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { THEME } from "constants/styles";

import { PreloadedCatalogContext } from "helpers/translate";

import FeatureFlags from "contexts/featureFlags";
import en from "locale/en/messages";

const preloadedCatalogs = { en };

const Providers = ({ children }) => (
  <ThemeProvider theme={THEME}>
    <FeatureFlags>
      <PreloadedCatalogContext.Provider value={preloadedCatalogs}>
        {children}
      </PreloadedCatalogContext.Provider>
    </FeatureFlags>
  </ThemeProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
