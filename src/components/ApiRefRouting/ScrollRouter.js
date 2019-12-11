import React from "react";
import PropTypes from "prop-types";

import { findActiveNode } from "helpers/dom";

export const TrackedElementsContext = React.createContext();

const sortByPosition = (a, b) => {
  const aY = a.current.getBoundingClientRect().y;
  const bY = b.current.getBoundingClientRect().y;
  return aY - bY;
};
let lastScrollPosition = 0;

const routeMap = new Map();

export const ScrollRouter = ({ children }) => {
  const initialLoadCheck = React.useRef(false);
  const activeNodeRef = React.useRef();
  const trackedElementsRef = React.useRef([]);

  React.useEffect(() => {
    const handler = () => {
      // If we haven't scrolled at least 20 pixels, just bail.
      if (Math.abs(window.scrollY - lastScrollPosition) < 20) {
        return;
      }
      const isScrollingDown = window.scrollY > lastScrollPosition;
      lastScrollPosition = window.scrollY;

      const newActiveNode = findActiveNode(
        trackedElementsRef.current,
        isScrollingDown,
      );
      // If we've found an active node and it's not the same one as we had
      // before, update the route.
      if (newActiveNode && newActiveNode !== activeNodeRef.current) {
        activeNodeRef.current = newActiveNode;
        window.history.replaceState({}, "", routeMap.get(newActiveNode), {
          replace: true,
        });
      }
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const trackElement = React.useCallback((ref, route) => {
    routeMap.set(ref, route);
    trackedElementsRef.current.push(ref);
    trackedElementsRef.current.sort(sortByPosition);
    // We want to scroll to the element associated with the route _once_.
    if (!initialLoadCheck.current && window.location.pathname === route) {
      initialLoadCheck.current = true;
      // Our navbar is 90px tall
      window.scrollTo(0, ref.current.offsetTop - 90);
    }
  }, []);
  const stopTrackingElement = React.useCallback((ref) => {
    routeMap.delete(ref);
    trackedElementsRef.current = trackedElementsRef.current.filter(
      (x) => x !== ref,
    );
  }, []);

  const contextValue = React.useMemo(
    () => ({
      stopTrackingElement,
      trackElement,
    }),
    [stopTrackingElement, trackElement],
  );

  return (
    <TrackedElementsContext.Provider value={contextValue}>
      {children}
    </TrackedElementsContext.Provider>
  );
};

ScrollRouter.propTypes = {
  children: PropTypes.node.isRequired,
};
