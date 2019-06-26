import React from "react";

import Providers from "components/Providers";

import en from "locale/en/messages";

export const wrapRootElement = ({ element }) => (
  <Providers
    preloadedCatalogs={{
      en,
    }}
  >
    {element}
  </Providers>
);
