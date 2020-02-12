import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { THEME } from "constants/styles";

import FeatureFlags from "contexts/featureFlags";

const Providers = ({ children }) => (
  <ThemeProvider theme={THEME}>
    <FeatureFlags>{children}</FeatureFlags>
  </ThemeProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
