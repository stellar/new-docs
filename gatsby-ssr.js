import React from "react";

import { SsrStyles } from "./src/basics/GlobalStyles";

export const wrapRootElement = ({ element }) => (
  <>
    <SsrStyles />
    {element}
  </>
);
