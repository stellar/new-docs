import React from "react";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";

import { findActiveNode } from "helpers/dom";

const sortByPosition = (a, b) => {
  const aY = a.ref.current.getBoundingClientRect().top;
  const bY = b.ref.current.getBoundingClientRect().top;
  return aY - bY;
};
let lastScrollPosition = 0;

export const SideNavProgressContext = React.createContext({});

export const Provider = ({ children }) => {
  const [activeContent, setActiveNode] = React.useState({ id: "", ref: null });
  const [trackedElements, setTrackedElements] = React.useState([]);

  // We need to search just the refs pretty frequently, so memoize it so we
  // don't generate a ton of garbage.
  const elementRefs = React.useMemo(() => trackedElements.map((e) => e.ref), [
    trackedElements,
  ]);

  React.useEffect(() => {
    const handler = throttle(() => {
      // If we haven't scrolled at least 100 pixels, just bail.
      if (Math.abs(window.scrollY - lastScrollPosition) < 100) {
        return;
      }
      const isScrollingDown = window.scrollY > lastScrollPosition;
      lastScrollPosition = window.scrollY;

      const newActiveRef = findActiveNode(elementRefs, isScrollingDown);
      const newActiveNode = trackedElements.find((e) => e.ref === newActiveRef);
      if (newActiveNode && newActiveNode !== activeContent) {
        setActiveNode(newActiveNode);
      }
    }, 60);

    window.addEventListener("scroll", handler);
    handler();
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [activeContent, elementRefs, trackedElements]);

  const trackElement = React.useCallback(
    (ref) => {
      setTrackedElements((state) => [...state, ref].sort(sortByPosition));
    },
    [setTrackedElements],
  );
  const stopTrackingElement = React.useCallback(
    (ref) => {
      setTrackedElements((state) => state.filter((x) => x === ref));
    },
    [setTrackedElements],
  );

  const contextValue = React.useMemo(
    () => ({
      activeContent,
      stopTrackingElement,
      trackElement,
    }),
    [activeContent, stopTrackingElement, trackElement],
  );

  return (
    <SideNavProgressContext.Provider value={contextValue}>
      {children}
    </SideNavProgressContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
