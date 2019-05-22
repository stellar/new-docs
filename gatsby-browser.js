import React from "react";

import Providers from "./src/components/Providers";
import { PORTAL_TARGETS } from "./src/constants/domNodes";

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
  <Providers>{element}</Providers>
);

export const onInitialClientRender = () => {
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
