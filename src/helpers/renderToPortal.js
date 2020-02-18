import ReactDOM from "react-dom";

/**
 * Render outside the React tree in an SSR compatible way. SSR doesn't have
 * browser APIs and can't use refs, so we need to skip attempts to render them.
 * @param {ReactElement} node What to render
 * @param {string} target The target ID to render it in. Should be a portal
 * target constant.
 * @returns {void}
 */
export const renderToPortal = (node, target) => {
  if (typeof window !== "undefined") {
    return ReactDOM.createPortal(node, document.querySelector(`#${target}`));
  }
  return null;
};
