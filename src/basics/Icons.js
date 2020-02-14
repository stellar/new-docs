import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CloseIcon from "assets/icons/close.svg";

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

export const CloseX = ({ color }) => (
  <CloseEl color={color}>
    <CloseIcon />
  </CloseEl>
);

CloseX.propTypes = {
  color: PropTypes.string.isRequired,
};
