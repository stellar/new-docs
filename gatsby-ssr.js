import React from "react";

import Providers from "components/Providers";

import en from "locale/en/messages";
import es from "locale/es/messages";

export const wrapRootElement = ({ element }) => (
  <Providers
    preloadedCatalogs={{
      en,
      es,
    }}
  >
    {element}
  </Providers>
);
