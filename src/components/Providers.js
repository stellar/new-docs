import React from "react";
import { ThemeProvider } from "styled-components";

import { PALETTE } from "../constants/styles";

import GlobalStyles from "../basics/GlobalStyles";

const Providers = ({ children }) => (
  <ThemeProvider theme={PALETTE}>
    <>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
);

export default Providers;
