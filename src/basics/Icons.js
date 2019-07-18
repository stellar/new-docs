import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { CSS_TRANSITION_SPEED } from "constants/styles";
import { ARROW_SIZES } from "constants/arrows";

import ArrowIcon from "assets/icons/arrow.svg";

const ArrowEl = styled.div`
  display: inline-block;
  margin-right: ${(props) => (props.noMargin ? "0" : "0.5rem")};
  transform: translateX(0);
  transition: transform ${CSS_TRANSITION_SPEED.default} linear;

  svg {
    vertical-align: middle;
    stroke-width: 11px;
    width: ${(props) =>
      ({ big: "20px", medium: "15px", small: "12px" }[props.size])};
    height: 100%;
    stroke: ${(props) => props.arrowColor};
  }
`;

export const Arrow = ({
  arrowColor,
  size = ARROW_SIZES.medium,
  className,
  noMargin,
}) => (
  <ArrowEl
    size={size}
    className={className}
    arrowColor={arrowColor}
    noMargin={noMargin}
  >
    <ArrowIcon />
  </ArrowEl>
);

Arrow.propTypes = {
  arrowColor: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
  noMargin: PropTypes.bool,
};
