import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FONT_WEIGHT, PALETTE } from "constants/styles";

const SelectWrapperEl = styled.div`
  position: relative;
  margin-bottom: 2rem;

  &:before {
    content: "⬇";
    position: absolute;
    right: 1rem;
    top: 50%;
    color: ${PALETTE.yellow};
  }
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

export const Select = React.forwardRef(
  ({ children, className, label, ...props }, ref) => (
    <SelectWrapperEl className={className}>
      <LabelEl>
        {label}
        <SelectEl {...props} ref={ref}>
          {children}
        </SelectEl>
      </LabelEl>
    </SelectWrapperEl>
  ),
);

Select.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  label: PropTypes.node.isRequired,
};
