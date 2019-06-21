import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  PALETTE,
  CSS_TRANSITION_SPEED,
  CSS_TRANSITION_DELAY,
} from "constants/styles";

export const BasicButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.4px;
`;
export const Button = styled(BasicButton)`
  border: none;
  background-color: ${({ theme }) => theme.cta.body};
  color: ${({ theme }) => theme.cta.text};
  padding: 0.75rem 1.375rem;
  border-radius: 2rem;
`;
const ButtonWrapper = styled.div`
  text-align: center;
`;
const ArrowEl = styled.span`
  color: ${({ color }) => color};
  display: inline-block;
  margin-right: 0.5rem;
  transform: translateX(0);
  transition: color ${CSS_TRANSITION_SPEED.default} ease
      ${CSS_TRANSITION_DELAY.default},
    transform ${CSS_TRANSITION_SPEED.default} linear;

  ${Button}:hover & {
    transform: translateX(0.25rem);
    transition: transform ${CSS_TRANSITION_SPEED.default} linear;
  }
`;

export const ButtonEl = ({ cta, hasArrow = true, ...props }) => (
  <ButtonWrapper>
    <Button {...props}>
      {hasArrow && <ArrowEl color={PALETTE.white}>→ </ArrowEl>}
      {cta}
    </Button>
  </ButtonWrapper>
);

ButtonEl.propTypes = {
  cta: PropTypes.string.isRequired,
  hasArrow: PropTypes.bool,
};
