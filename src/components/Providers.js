import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { THEME } from "../constants/styles";

import GlobalStyles from "../basics/GlobalStyles";

const Providers = ({ children }) => (
  <ThemeProvider theme={THEME}>
    <>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
