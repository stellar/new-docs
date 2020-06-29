import React from "react";
import * as Sentry from "@sentry/browser";

import { IS_PRODUCTION } from "constants/env";
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
  if (IS_PRODUCTION) {
    // Set up Sentry
    Sentry.init({
      dsn: "https://efc31f19f9c54082b8d993bfb62eee57@sentry.io/1531056",
    });

    // Set up Google Analytics
    /* eslint-disable */
    if (typeof ga === "function") {
      ga("create", "UA-53373928-1", "auto");
      ga("set", "anonymizeIp", true);

      // We want developers.stellar.org and www.stellar.org to use the same
      // session
      ga("require", "linker");
      ga("linker:autolink", ["www.stellar.org", "stellar.org"]);

      ga("send", "pageview");
    }
    /* eslint-enable */
  }
};

const isApiReference = (routerProps) =>
  /\/api/.test(routerProps.location.pathname);

const getTargetOffset = (hash) => {
  const offsetY = 0;
  const id = window.decodeURI(hash.replace("#", ""));

  if (id) {
    const element = document.getElementById(id);

    if (element) {
      return element.offsetTop - offsetY;
    }
  }
  return null;
};

export const shouldUpdateScroll = ({ routerProps }) => {
  if (isApiReference(routerProps)) {
    return routerProps.location.pathname;
  }

  const offset = getTargetOffset(location.hash);

  if (offset) {
    window.scrollTo(0, offset);

    return false;
  }

  return true;
};
