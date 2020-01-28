import React from "react";

import Providers from "components/Providers";
import { GlobalStyles } from "basics/GlobalStyles";

export const wrapRootElement = ({ element }) => (
  <Providers>
    <GlobalStyles />
    {element}
  </Providers>
);
