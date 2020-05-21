import React from "react";
import * as Sentry from "@sentry/browser";

import { GlobalStyles } from "basics/GlobalStyles";
import Providers from "components/Providers";
import { IS_BUILD } from "./buildHelpers/env";

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
    (function(i, s, o, g, r, a, m) {
      i["GoogleAnalyticsObject"] = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(
      window,
      document,
      "script",
      "https://www.google-analytics.com/analytics.js",
      "ga",
    );
    if (typeof ga === "function") {
      ga("create", "UA-53373928-1", "auto", {});
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
