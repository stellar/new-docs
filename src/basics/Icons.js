import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ArrowInCircle = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: ${(props) => props.bgColor};

  ::after {
    content: "\u2192";
    color: ${(props) => props.arrowColor};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    line-height: 30px;
    vertical-align: middle;
    height: 30px;
    width: 30px;
  }
`;

/**
 * @desc Arrow in Circle Icon
 * @param String
 * Example: The Circle Arrow in Footer's Email Address input
 */
export const IconArrowInCircle = ({ bgColor, arrowColor }) => {
  return <ArrowInCircle bgColor={bgColor} arrowColor={arrowColor} />;
};

IconArrowInCircle.propTypes = {
  bgColor: PropTypes.string.isRequired,
  arrowColor: PropTypes.string.isRequired,
};
