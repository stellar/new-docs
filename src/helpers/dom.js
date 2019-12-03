import TweenLite from "gsap/TweenLite";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// We have to include this so that Webpack doesn't tree-shake the plugin out of
// the production bundle.
// eslint-disable-next-line
const scrollPlugin = ScrollToPlugin;

export const smoothScrollTo = (node, options = {}) => {
  const { offset = 0, duration = 0.55 } = options;

  TweenLite.to(window, duration, {
    scrollTo: {
      y: node.offsetTop + offset,
    },
  });
};
