import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

export const arrowIconStyle = css`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-style: none;
  background-color: ${(props) => props.bgColor};

  ::after {
    content: "\u2192";
    color: ${(props) => props.arrowColor};
    position: relative;
    line-height: 30px;
    vertical-align: middle;
    height: 30px;
    width: 30px;
  }
`;

const ArrowInCircle = styled.button`
  ${arrowIconStyle};
`;
/**
 * @desc Arrow in Circle Icon
 * @param {string} bgColor Background color
 * @param {string} arrowColor Arrow color
 * Example: The Circle Arrow in Footer's Email Address input
 * @return {React} React elements
 */
export const IconArrowInCircle = ({ bgColor, arrowColor }) => (
  <ArrowInCircle bgColor={bgColor} arrowColor={arrowColor} />
);

IconArrowInCircle.propTypes = {
  bgColor: PropTypes.string.isRequired,
  arrowColor: PropTypes.string.isRequired,
};
