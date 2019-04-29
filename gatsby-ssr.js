import React from "react";

import Providers from "./src/components/Providers";

export const wrapRootElement = ({ element }) => (
  <Providers>{element}</Providers>
);
