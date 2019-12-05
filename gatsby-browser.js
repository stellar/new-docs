import React from "react";
import * as Sentry from "@sentry/browser";

import Providers from "./src/components/Providers";
import { PORTAL_TARGETS } from "./src/constants/domNodes";
import { IS_BUILD } from "./buildHelpers/env";

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
  <Providers>{element}</Providers>
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

  Object.values(PORTAL_TARGETS).forEach((name) => {
    const portal = document.createElement("div");
    portal.id = name;
    document.body.appendChild(portal);
  });
};

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
  }
};
