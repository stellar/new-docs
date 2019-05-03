import React from "react";

import Providers from "./src/components/Providers";

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
  <Providers>{element}</Providers>
);
