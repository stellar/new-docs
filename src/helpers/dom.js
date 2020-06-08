import { TweenLite } from "gsap/TweenLite";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// We have to include this so that Webpack doesn't tree-shake the plugin out of
// the production bundle.
// eslint-disable-next-line
const scrollPlugin = ScrollToPlugin;

export const smoothScrollTo = (node, options = {}, onCompleteFn) => {
  const offset = 0;
  const { duration = 0.55 } = options;

  TweenLite.to(window, duration, {
    scrollTo: {
      y: node.offsetTop + offset,
    },
    onComplete: onCompleteFn,
  });
};

/**
 * findActiveNode expects a list of react refs and whether we're scrolling down
 * or not, and returns which node is most likely to be in focus.
 * @param {array} possibleNodes A list of react refs, sorted by vertical position
 * @param {bool} isScrollingDown Whether the user is scrolling down
 * @return {ref} The node most likely to be active
 */
export const findActiveNode = (possibleNodes, isScrollingDown) => {
  const topEdge = window.innerHeight * 0.125;
  const bottomEdge = window.innerHeight * 0.5;

  const isReachedBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - topEdge;

  return possibleNodes.find((x) => {
    if (!x.current) {
      return false;
    }
    const { top, bottom } = x.current.getBoundingClientRect();

    if (isScrollingDown) {
      // For Edge case
      // The last two items on https://developers.stellar.org/docs/
      // Has equal hiearachy when scrolled all the way down
      // Display the last item when scrolled all the way to the bottom
      return isReachedBottom
        ? bottom + bottomEdge > window.innerHeight - topEdge
        : top < bottomEdge && top >= 0;
    }

    return bottom > topEdge && bottom < window.innerHeight;
  });
};
