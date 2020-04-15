import React from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import styled from "styled-components";

import { PORTAL_TARGETS, DOM_TARGETS } from "constants/domNodes";
import { PALETTE, Z_INDEXES } from "constants/styles";

import { renderToPortal } from "helpers/renderToPortal";

const TooltipEl = styled.div`
  position: absolute;
  display: block;
  border-radius: 4px;
  overflow: visible;
  font-size: 0.75rem;
  width: 6.25rem;
  height: auto;
  padding: 0.625rem;
  z-index: ${Z_INDEXES.tooltip};
  color: ${PALETTE.white};
  background-color: rgba(41, 45, 62, 1);

  &::after {
    content: "";
    position: absolute;
    width: 0.625rem;
    height: 0.625rem;
    right: 1rem;
    bottom: -4px;
    background-color: rgba(41, 45, 62, 1);
    transform: rotate(45deg);
  }
`;

export const Tooltip = ({
  in: inProp,
  duration = 200,
  parentDimension,
  children,
}) => {
  const [tooltipDimension, setTooltipDimension] = React.useState({
    width: 0,
    height: 0,
  });
  const [tooltipPosition, setTooltipPosition] = React.useState({
    left: 0,
    top: 0,
  });

  const tooltipRef = React.useCallback((node) => {
    if (node !== null) {
      setTooltipDimension({
        width: node.getBoundingClientRect().width,
        height: node.getBoundingClientRect().height,
      });
    }
  }, []);

  React.useLayoutEffect(() => {
    const targetDom = document.querySelector(`#${DOM_TARGETS.contentColumn}`);

    const onResize = () => {
      if (tooltipDimension.width > 0) {
        setTooltipPosition({
          left: parentDimension.right - tooltipDimension.width + 16,
          top: Math.abs(
            targetDom.scrollTop -
              parentDimension.top +
              tooltipDimension.height +
              24,
          ),
        });
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [tooltipDimension, parentDimension]);

  return (
    <Transition
      in={inProp}
      appear
      mountOnEnter
      unmountOnExit
      timeout={duration}
    >
      {() =>
        renderToPortal(
          <TooltipEl
            ref={tooltipRef}
            duration={duration}
            style={tooltipPosition}
          >
            {children}
          </TooltipEl>,
          PORTAL_TARGETS.tooltip,
        )
      }
    </Transition>
  );
};

Tooltip.propTypes = {
  parentDimension: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  in: PropTypes.bool,
  duration: PropTypes.number,
};
