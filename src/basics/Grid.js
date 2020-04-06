import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { MEDIA_QUERIES } from "constants/styles";

const COL_SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

const COLUMNS = {
  xs: { count: 4, size: 4.375, margin: 1 },
  sm: { count: 8, size: 4.375, margin: 3 },
  md: { count: 12, size: 3.5, margin: 3 },
  lg: { count: 12, size: 4, margin: 4.5 },
  xl: { count: 22, size: 4, margin: 4.5 },
};

const getSizeQuery = (size) => {
  switch (size) {
    case COL_SIZES.sm:
      return `@media (${MEDIA_QUERIES.gtTablet})`;
    case COL_SIZES.md:
      return `@media (${MEDIA_QUERIES.gtLaptop})`;
    case COL_SIZES.lg:
      return `@media (${MEDIA_QUERIES.gtDesktop})`;
    case COL_SIZES.xl:
      return `@media (${MEDIA_QUERIES.gtXlDesktop})`;
    // xs screens always match, they'll be overridden by other sizes
    default:
      return `@media (min-width: 0px)`;
  }
};

const getColStyle = (size, prop) => {
  let standardProps;
  if (typeof prop === "number") {
    standardProps = {
      span: prop,
      offset: undefined,
      hide: false,
    };
  } else {
    standardProps = {
      span: prop.span || COLUMNS[size].count,
      offset: prop.offset || 0,
      hide: prop.hide || false,
    };
  }
  const { hide, offset, span } = standardProps;
  return css`
    ${getSizeQuery(size)} {
      display: ${hide ? "none" : "block"};
      grid-column: ${offset && `${offset + 1} /`} span ${span};
    }
  `;
};

const getSizeGrid = (screenSize) => {
  const { count, margin, size } = COLUMNS[screenSize];
  return css`
    ${getSizeQuery(screenSize)} {
      grid-template-columns: repeat(${count}, ${size}rem);
      column-gap: calc((100% - ${count * size}rem) / ${count - 1});
      margin: 0 ${margin}rem;
    }
  `;
};

export const Container = styled.div`
  margin: 0 auto;

  ${getSizeQuery(COL_SIZES.xs)} {
  }
  ${getSizeQuery(COL_SIZES.sm)} {
    max-width: 53rem;
  }
  ${getSizeQuery(COL_SIZES.md)} {
    max-width: unset;
  }
  ${getSizeQuery(COL_SIZES.lg)} {
    max-width: 90rem;
  }
  ${getSizeQuery(COL_SIZES.xl)} {
    max-width: 105rem;
  }
`;

export const Row = styled.div`
  display: grid;
  ${getSizeGrid(COL_SIZES.xs)}
  ${getSizeGrid(COL_SIZES.sm)}
  ${getSizeGrid(COL_SIZES.md)}
  ${getSizeGrid(COL_SIZES.lg)}
`;

export const RowWithXl = styled(Row)`
  ${getSizeGrid(COL_SIZES.xl)}
`;

const ColumnEl = styled.div`
  ${({ xs }) => getColStyle(COL_SIZES.xs, xs)};
  ${({ sm }) => getColStyle(COL_SIZES.sm, sm)};
  ${({ md }) => getColStyle(COL_SIZES.md, md)};
  ${({ lg }) => getColStyle(COL_SIZES.lg, lg)};
  ${({ xl }) => (xl ? getColStyle(COL_SIZES.xl, xl) : "")};

  ${({ isIndependentScroll }) =>
    isIndependentScroll &&
    css`
      @media (${MEDIA_QUERIES.gtTablet}) {
        overflow-y: scroll;
        height: 100vh;
        /* --vh will be set via setViewportHeight() ApiReference.js */
        height: calc(var(--vh, 1vh) * 100);
      }
    `}
`;

export const Column = (props) => {
  const {
    xs = COLUMNS[COL_SIZES.xs].count,
    sm = xs || COLUMNS[COL_SIZES.sm].count,
    md = sm || COLUMNS[COL_SIZES.md].count,
    lg = md || COLUMNS[COL_SIZES.lg].count,
    ...rest
  } = props;
  return <ColumnEl {...rest} {...{ xs, sm, md, lg }} />;
};

const ColumnSizePropType = PropTypes.oneOfType([
  PropTypes.number.isRequired,
  PropTypes.shape({
    span: PropTypes.number,
    hide: PropTypes.bool,
    offset: PropTypes.number,
  }),
]);

Column.propTypes = {
  xs: ColumnSizePropType,
  sm: ColumnSizePropType,
  md: ColumnSizePropType,
  lg: ColumnSizePropType,
};

export const gridHelpers = {
  getColStyle,
  getSizeGrid,
  getSizeQuery,
  COL_SIZES,
  COLUMNS,
};
