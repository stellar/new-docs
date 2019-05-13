import React from "react";

import Providers from "components/Providers";

export const wrapRootElement = ({ element }) => (
  <Providers>{element}</Providers>
);
