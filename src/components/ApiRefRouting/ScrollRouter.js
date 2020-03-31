import React from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";

import { DOM_TARGETS } from "constants/domNodes";

import { smoothScrollTo, findActiveNode } from "helpers/dom";

export const Context = React.createContext();

const sortByPosition = (a, b) => {
  const aY = a.current.getBoundingClientRect().top;
  const bY = b.current.getBoundingClientRect().top;
  return aY - bY;
};
let lastScrollPosition = 0;

const routeMap = new Map();
const elementMap = new Map();

export const ScrollRouter = ({ children }) => {
  const initialLoadCheck = React.useRef(false);
  const activeNodeRef = React.useRef();
  const trackedElementsRef = React.useRef([]);
  const isScrollingDown = React.useRef(false);

  // Navigation
  const onLinkClick = React.useCallback(function onLinkClick(route) {
    window.history.pushState(null, null, route);
    smoothScrollTo(elementMap.get(route).current, { duration: 0 });
  }, []);

  // Scroll listener
  React.useEffect(() => {
    const contentDom = document.querySelector(`#${DOM_TARGETS.contentColumn}`);
    const handler = throttle(() => {
      // If we haven't scrolled at least 20 pixels, just bail.
      if (Math.abs(contentDom.scrollY - lastScrollPosition) < 20) {
        return;
      }
      isScrollingDown.current = contentDom.scrollY > lastScrollPosition;
      lastScrollPosition = contentDom.scrollY;

      const newActiveNode = findActiveNode(
        trackedElementsRef.current,
        isScrollingDown.current,
      );
      // If we've found an active node and it's not the same one as we had
      // before, update the route.
      if (newActiveNode && newActiveNode !== activeNodeRef.current) {
        activeNodeRef.current = newActiveNode;
        window.history.replaceState(null, null, routeMap.get(newActiveNode));
      }
    }, 60);

    contentDom.addEventListener("scroll", handler);
    handler();

    return () => {
      contentDom.removeEventListener("scroll", handler);
    };
  }, []);

  // Tracked sections
  const trackElement = React.useCallback((ref, route) => {
    routeMap.set(ref, route);
    elementMap.set(route, ref);
    trackedElementsRef.current.push(ref);
    trackedElementsRef.current.sort(sortByPosition);
    // We want to scroll to the element associated with the route _once_.
    if (!initialLoadCheck.current && window.location.pathname === route) {
      initialLoadCheck.current = true;
      // Our navbar is 90px tall
      smoothScrollTo(ref.current, { duration: 0 });
    }
  }, []);
  const stopTrackingElement = React.useCallback((ref) => {
    const route = routeMap.get(ref);
    routeMap.delete(ref);
    elementMap.delete(route);
    trackedElementsRef.current = trackedElementsRef.current.filter(
      (x) => x !== ref,
    );
  }, []);

  const contextValue = React.useMemo(
    () => ({
      stopTrackingElement,
      trackElement,
      onLinkClick,
      isScrollingDown,
    }),
    [stopTrackingElement, trackElement, onLinkClick, isScrollingDown],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ScrollRouter.propTypes = {
  children: PropTypes.node.isRequired,
};
