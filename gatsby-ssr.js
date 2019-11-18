import React from "react";

import Providers from "components/Providers";
import { FEATURE_FLAGS } from "./buildHelpers/env";

import en from "locale/en/messages";

export const wrapRootElement = ({ element }) => (
  <Providers
    preloadedCatalogs={{
      en,
    }}
    featureFlags={FEATURE_FLAGS}
  >
    {element}
  </Providers>
);
