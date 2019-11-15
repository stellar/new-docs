import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";
import { PrismStyles } from "basics/prism";

const MethodTableEl = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  background: ${(props) =>
    props.isCodeSnippet ? PALETTE.black90 : PALETTE.white80};

  table {
    font-family: ${(props) =>
      props.hasCodeFormat ? FONT_FAMILY.monospace : FONT_FAMILY.base};
  }

  thead {
    display: ${(props) =>
      props.disableHeader ? "none" : "table-header-group"};
  }

  td {
    border: ${(props) => props.disableBorder && "none"};
    padding: ${(props) => props.disableBorder && "0.5rem 0"};

    &:first-child {
      color: ${(props) =>
        props.primaryColor ? props.primaryColor : PALETTE.black80};
      font-weight: ${(props) =>
        props.disableBorder ? FONT_WEIGHT.bold : FONT_WEIGHT.medium};
      padding-right: ${(props) => (props.disableBorder ? "1rem" : "inherit")};
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
  font-weight: ${FONT_WEIGHT.medium};
`;
const ContentEl = styled.div`
  padding: 1rem 0;
`;

/**
 * Note: This exports a React component instead of a styled-component.
 * [Design Mockup](https://zpl.io/V1DGqJ5)
 */

export const MethodTable = React.forwardRef(function MethodTable(
  { title, children, isCodeSnippet, ...props },
  ref,
) {
  return (
    <MethodTableEl ref={ref} {...props}>
      <TitleEl>{title}</TitleEl>
      {!isCodeSnippet && <PrismStyles />}
      <ContentEl>{children}</ContentEl>
    </MethodTableEl>
  );
});

MethodTable.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  isCodeSnippet: PropTypes.bool,
};
