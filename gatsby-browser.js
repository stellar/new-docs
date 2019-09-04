import React from "react";
import * as Sentry from "@sentry/browser";

import Providers from "./src/components/Providers";
import { PORTAL_TARGETS } from "./src/constants/domNodes";

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
  <Providers>{element}</Providers>
);

export const onInitialClientRender = () => {
  if (process.env.NODE_ENV === "production") {
    Sentry.init({
      dsn: "https://6849a482ebf54ae8939fd2d7e1fa29ad@sentry.io/1531056",
    });
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
