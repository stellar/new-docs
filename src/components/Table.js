import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";

const TableEl = styled.div`
  table {
    width: 100%;
    padding: 0;
    margin: 0;
    font-size: 0.875rem;
    position: relative;
    border-collapse: collapse;
    font-family: ${(props) =>
      props.hasCodeFormat ? FONT_FAMILY.monospace : FONT_FAMILY.base};
  }

  tr:nth-child(even) {
    background-color: ${(props) =>
      props.hasBorder ? PALETTE.white80 : "none"};
  }

  td {
    vertical-align: top;
    border: ${(props) =>
      props.hasBorder ? `solid 1px ${PALETTE.white60}` : "none"};
    color: ${PALETTE.black60};
    padding: ${(props) => (props.hasBorder ? "0.75rem" : "0.5rem 0")};
  }

  thead th {
    min-width: 10rem;
    line-height: 3;
    vertical-align: middle;
  }

  th {
    color: ${(props) =>
      props.customColor ? props.customColor : PALETTE.black80};
    text-transform: uppercase;
    font-weight: ${FONT_WEIGHT.medium};
    text-align: left;
  }
`;

/**
 * Note: This exports a React component instead of a styled-component.
 * [Docs Table Mockup](https://zpl.io/2ZXQ0YJ) and
 * [API Reference Table Mockup](https://zpl.io/a8JXznJ)
 */

export const Table = React.forwardRef(function Table(
  { hasCodeFormat, hasBorder, customColor, children, ...props },
  ref,
) {
  return (
    <TableEl
      customColor={customColor}
      hasBorder={hasBorder}
      hasCodeFormat={hasCodeFormat}
      ref={ref}
      {...props}
    >
      {children}
    </TableEl>
  );
});

Table.defaultProps = {
  hasBorder: false,
  hasCodeFormat: false,
};

Table.propTypes = {
  /**
   * Table Content
   */
  children: PropTypes.node.isRequired,
  /**
   * Set to true if table includes a code snippet to change its "font-family" to "IBM Plex Mono" instead of its default "IBM Plex Sans"
   */
  hasCodeFormat: PropTypes.bool,
  /**
   * Set to true if table contains a border
   */
  hasBorder: PropTypes.bool,
  /**
   * The color of table head
   */
  customColor: PropTypes.string,
};
