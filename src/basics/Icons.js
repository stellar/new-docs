import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CloseSVG from "assets/icons/close.svg";
import ChevronSVG from "assets/icons/chevron.svg";

const ArrowEl = styled.div`
  position: relative;

  svg {
    transform: ${(props) =>
      (props.direction === "down" && "rotate(90deg)") ||
      (props.direction === "right" && "rotate(0deg)") ||
      (props.direction === "up" && "rotate(270deg)")};
  }
`;

export const ArrowIcon = ({ className, direction }) => (
  <ArrowEl className={className} direction={direction}>
    <ChevronSVG />
  </ArrowEl>
);

ArrowIcon.propTypes = {
  direction: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const CloseEl = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    width: 14px;
    height: 14px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    stroke: ${(props) => props.color};
  }
`;

export const CloseIcon = ({ color }) => (
  <CloseEl color={color}>
    <CloseSVG />
  </CloseEl>
);

CloseIcon.propTypes = {
  color: PropTypes.string.isRequired,
};
