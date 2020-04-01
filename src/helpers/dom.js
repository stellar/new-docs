import memoize from "memoize-one";
import { TweenLite } from "gsap/TweenLite";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { DOM_TARGETS } from "constants/domNodes";

// We have to include this so that Webpack doesn't tree-shake the plugin out of
// the production bundle.
// eslint-disable-next-line
const scrollPlugin = ScrollToPlugin;

export const smoothScrollTo = (node, options = {}) => {
  const { offset = 0, duration = 0.55 } = options;
  const targetDom = document.querySelector(`#${DOM_TARGETS.contentColumn}`);

  TweenLite.to(targetDom, duration, {
    scrollTo: {
      y: node.offsetTop + offset,
    },
  });
};

const reverse = memoize((arr) => arr.slice().reverse());

/**
 * findActiveNode expects a list of react refs and whether we're scrolling down
 * or not, and returns which node is most likely to be in focus.
 * @param {array} possibleNodes A list of react refs, sorted by vertical position
 * @param {bool} isScrollingDown Whether the user is scrolling down
 * @return {ref} The node most likely to be active
 */
export const findActiveNode = (possibleNodes, isScrollingDown) => {
  const topEdge = window.innerHeight * 0.125;
  const bottomEdge = window.innerHeight * 0.25 + topEdge;

  if (!isScrollingDown) {
    // eslint-disable-next-line no-param-reassign
    possibleNodes = reverse(possibleNodes);
  }

  return possibleNodes.find((x) => {
    if (!x.current) {
      return false;
    }
    const { bottom } = x.current.getBoundingClientRect();
    return isScrollingDown
      ? bottom > topEdge && bottom < window.innerHeight
      : bottom < bottomEdge && bottom > 0;
  });
};
