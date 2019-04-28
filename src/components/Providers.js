import React from "react";
import { ThemeProvider } from "styled-components";

import { PALETTE } from "../constants/styles";

import GlobalStyles, { SsrStyles } from "../basics/GlobalStyles";

const Providers = ({ children }) => (
  <ThemeProvider theme={PALETTE}>
    <>
      {/* SSR styles aren't loaded in watch mode, so we need to manually
      include them to avoid seeing different things in dev/prod */}
      {process.env.NODE_ENV === "development" && <SsrStyles />}
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
);

export default Providers;
