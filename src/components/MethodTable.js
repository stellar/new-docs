import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, FONT_WEIGHT } from "constants/styles";

const MethodTableEl = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  background: ${PALETTE.white80};
  border-radius: 4px;

  thead {
    display: none;
  }

  td {
    border: none;
    padding: 0.5rem 0;

    &:first-child {
      font-weight: ${FONT_WEIGHT.bold};
      padding-right: 1rem;
    }
  }
`;

const TitleEl = styled.div`
  position: relative;
  padding: 0;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${PALETTE.white60};
  font-size: 0.875rem;
  font-weight: ${FONT_WEIGHT.bold};
`;
const ContentEl = styled.div`
  padding: 0;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;

/**
 * Note: This exports a React component instead of a styled-component.
 * [Design Mockup](https://zpl.io/V1DGqJ5)
 */

export const MethodTable = React.forwardRef(function MethodTable(
  { title, children, ...props },
  ref,
) {
  return (
    <MethodTableEl ref={ref} {...props}>
      <TitleEl>{title}</TitleEl>
      <ContentEl>{children}</ContentEl>
    </MethodTableEl>
  );
});

MethodTable.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
