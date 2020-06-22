import React from "react";
import * as Sentry from "@sentry/browser";

import { IS_BUILD } from "constants/env";
import { GlobalStyles } from "basics/GlobalStyles";
import Providers from "components/Providers";

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
  <Providers>
    <GlobalStyles />
    {element}
  </Providers>
);

export const onInitialClientRender = () => {
  if (IS_BUILD) {
    // Set up Sentry
    Sentry.init({
      dsn: "https://efc31f19f9c54082b8d993bfb62eee57@sentry.io/1531056",
    });

    // Set up Google Analytics
    /* eslint-disable */
    if (typeof ga === "function") {
      ga("create", "UA-53373928-1", "auto", {});
      ga("set", "anonymizeIp", true);
      ga("send", "pageview");
    }
    /* eslint-enable */
  }
};

const isApiReference = (routerProps) =>
  /\/api/.test(routerProps.location.pathname);

export const shouldUpdateScroll = ({ routerProps }) => {
  if (isApiReference(routerProps)) {
    return routerProps.location.pathname;
  }
  return true;
};
