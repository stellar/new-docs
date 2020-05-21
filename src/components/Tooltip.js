import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PORTAL_TARGETS } from "constants/domNodes";
import { PALETTE, Z_INDEXES } from "constants/styles";

import { renderToPortal } from "helpers/renderToPortal";

// For the arrow, it should be 4px (.25rem) away from the edge. Since it's a box
// rotated 45 degrees, calculate the length of 1 side of the box.
// a^2 + b^2 = c^2
const hypotenuse = (0.25 ** 2 + 0.25 ** 2) ** 0.5;

const El = styled.div``;
const TooltipEl = styled.div`
  position: absolute;
  display: block;
  border-radius: 4px;
  overflow: visible;
  font-size: 0.75rem;
  padding: 0.625rem;
  z-index: ${Z_INDEXES.tooltip};
  color: ${PALETTE.white};
  background-color: rgba(41, 45, 62, 1);
  pointer-events: none;
  opacity: 0;
  transition: opacity ${(props) => props.duration}ms ease-in-out;
  ${({ isOpen }) =>
    isOpen
      ? `
          opacity: 1;
          pointer-events: all;
        `
      : ""}

  &::after {
    content: "";
    position: absolute;
    width: ${hypotenuse}rem;
    height: ${hypotenuse}rem;
    right: 1rem;
    bottom: -0.25rem;
    background-color: rgba(41, 45, 62, 1);
    transform: rotate(45deg);
    // Not sure why but this makes it look nicer. Maybe fine units getting
    // trimmed weirdly?? One of the square's corners appears to be cut off.
    transform-origin: top;
  }
`;

export const Tooltip = ({ duration = 150, message, children }) => {
  const wrapperRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

  const tooltipRef = React.useRef();
  const updateDimensions = React.useCallback(() => {
    if (tooltipRef.current) {
      const { width, height } = tooltipRef.current.getBoundingClientRect();
      setSize({
        width,
        height,
      });
    }
  }, []);

  React.useLayoutEffect(() => {
    if (!isOpen || !tooltipRef.current) {
      return;
    }
    const { right, top } = wrapperRef.current.getBoundingClientRect();
    const newRight = window.innerWidth - right;
    // We need height + some because of the extra space for the little pointer
    // bit. That's .25rem away
    const newTop = window.pageYOffset + top - (size.height + 4);
    tooltipRef.current.style.right = `${newRight}px`;
    tooltipRef.current.style.top = `${newTop}px`;
  }, [isOpen, size]);

  return (
    <El
      ref={wrapperRef}
      onMouseEnter={() => {
        setIsOpen(true);
        updateDimensions();
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        updateDimensions();
      }}
    >
      {children}
      {renderToPortal(
        <TooltipEl
          isOpen={isOpen}
          ref={tooltipRef}
          duration={duration}
          //  style={position}
        >
          {message}
        </TooltipEl>,
        PORTAL_TARGETS.tooltip,
      )}
    </El>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  duration: PropTypes.number,
};
