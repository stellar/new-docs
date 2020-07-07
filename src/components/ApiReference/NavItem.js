import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import {
  CSS_TRANSITION_SPEED,
  FONT_WEIGHT,
  PALETTE,
  MEDIA_QUERIES,
} from "constants/styles";

import { isInViewport } from "helpers/dom";
import { useMatchMedia } from "helpers/useMatchMedia";

import { Context as ScrollRouterContext } from "components/ApiReference/ScrollRouter";

const activeStyles = `
  color: ${PALETTE.purpleBlue};
  font-weight: ${FONT_WEIGHT.bold};
`;
const NavItemEl = styled.div`
  text-align: left;
  white-space: nowrap;
  font-size: ${(props) => (props.depth > 0 ? "0.875rem" : "1rem")};
  color: ${(props) => (props.depth === 0 ? PALETTE.black80 : PALETTE.black60)};
  padding: 0.25rem 0;
  padding-left: ${(props) => (props.depth > 1 ? `${props.depth - 1}rem` : 0)};
  transition: opacity ${CSS_TRANSITION_SPEED.default} ease-out;
  font-weight: ${FONT_WEIGHT.normal};

  ${(props) =>
    props.isActive
      ? css`
          ${activeStyles}
        `
      : ""}
`;

const NAV_BAR_HEIGHT = 89;
const FIXED_NAV_DISTANCE = 140 + NAV_BAR_HEIGHT;
export const NavItem = ({ isActive, forwardedRef, children, depth }) => {
  const itemRef = React.useRef();
  const parentDom = forwardedRef;
  const { isScrollingDown, setIsNavClicked } = React.useContext(
    ScrollRouterContext,
  );
  const isMobile = useMatchMedia(`(${MEDIA_QUERIES.ltLaptop})`);

  React.useLayoutEffect(() => {
    if (isActive && parentDom && !isMobile) {
      const activeItemSize = itemRef.current.getBoundingClientRect();

      /* If the active navigation is not in view
      For cases when a user scrolled the nav to the point
      the active nav is out of viewport */
      if (!isInViewport(itemRef.current)) {
        itemRef.current.scrollIntoView();
      }

      /* If scroll direction is down and its active item's top value
       is bigger than FIXED_NAV_DISTANCE (229px), subtract that amount
       from scrollTop to keep the consistent top value
       Its top value gets inconsistent when it hits the separate dropdown category
      */
      if (isScrollingDown.current && activeItemSize.top > FIXED_NAV_DISTANCE) {
        if (activeItemSize.top > FIXED_NAV_DISTANCE) {
          /* Reset the distance between the active nav and its offset top */
          parentDom.current.scrollTop +=
            activeItemSize.top - FIXED_NAV_DISTANCE;
        } else {
          parentDom.current.scrollTop += activeItemSize.height;
        }
      } else if (
        !isScrollingDown.current &&
        activeItemSize.top < FIXED_NAV_DISTANCE
      ) {
        if (activeItemSize.top > FIXED_NAV_DISTANCE) {
          parentDom.current.scrollTop -=
            activeItemSize.top - FIXED_NAV_DISTANCE;
        } else {
          parentDom.current.scrollTop -= activeItemSize.height;
        }
      }
    }
  }, [isActive, parentDom, isScrollingDown, isMobile]);

  return (
    <NavItemEl
      isActive={isActive}
      depth={depth}
      ref={itemRef}
      onClick={() => {
        setIsNavClicked(true);
      }}
    >
      {children}
    </NavItemEl>
  );
};
NavItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  forwardedRef: PropTypes.object,
  children: PropTypes.node.isRequired,
  depth: PropTypes.number.isRequired,
};
