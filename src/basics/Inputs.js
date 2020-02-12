import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ARROW_SIZES } from "constants/arrows";
import { FONT_WEIGHT, PALETTE } from "constants/styles";

import { Arrow } from "basics/Icons";

const SelectWrapperEl = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;
const LabelEl = styled.label`
  font-size: 0.875rem;
  font-weight: ${FONT_WEIGHT.bold};
  color: ${PALETTE.dark};
  letter-spacing: 0;
`;
const SelectEl = styled.select`
  color: ${PALETTE.mediumGrey};
  display: block;
  width: 100%;
  padding: calc(1rem - 1px);
  background: ${PALETTE.white};
  border: 1px solid ${PALETTE.lightestGrey};
  border-radius: 0;
  appearance: none;
`;
const ArrowEl = styled(Arrow)`
  transform: rotate(90deg);
  position: absolute;
  right: 0.5rem;
  bottom: 1.125rem;
  color: ${PALETTE.yellow};
`;

export const Select = React.forwardRef(
  ({ children, className, label, ...props }, ref) => (
    <SelectWrapperEl className={className}>
      <LabelEl>
        {label}
        <SelectEl {...props} ref={ref}>
          {children}
        </SelectEl>
      </LabelEl>
      <ArrowEl size={ARROW_SIZES.small} arrowColor={PALETTE.yellow} />
    </SelectWrapperEl>
  ),
);

Select.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  label: PropTypes.node.isRequired,
};
