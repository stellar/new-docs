import styled from "styled-components";
import {
  PALETTE,
  DEFAULT_COLUMN_WIDTH,
  FONT_WEIGHT,
  MEDIA_QUERIES,
} from "constants/styles";
import { Link } from "basics/Links";
import { H5 } from "basics/Text";
import { Column, gridHelpers } from "basics/Grid";

export const NavLink = styled(Link)`
  color: inherit;
  font-weight: unset;
  display: block;

  &:hover {
    color: ${PALETTE.lightGrey};
  }
`;
export const ExpansionContainer = styled.div`
  margin-top: 1rem;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;

  &:last-child {
    padding-bottom: 2.25rem;
  }
`;
export const NavTitle = styled(H5)`
  margin: 0;
  line-height: normal;
  font-weight: ${FONT_WEIGHT.bold};
  text-transform: uppercase;
`;
export const CustomColumn = styled(Column)`
  @media (${MEDIA_QUERIES.gtXlDesktop}) {
    grid-column: ${(props) => (props.xlColumn ? props.xlColumn : "inherit")};
  }
`;
const { getSizeGrid, COL_SIZES, COLUMNS } = gridHelpers;
const { count, size, margin } = COLUMNS[COL_SIZES.md];
export const ApiReferenceRow = styled.div`
  // Treat md as smallest size
  display: grid;
  grid-template-columns: repeat(${count}, ${size}rem);
  column-gap: calc((100% - ${count * size}rem) / ${count - 1});
  margin: 0 ${margin}rem;

  ${getSizeGrid(COL_SIZES.lg)}
  ${getSizeGrid(COL_SIZES.xl)}
`;
// API Reference needs to split the right hand section, so we need another grid
// scale so it properly aligns.
export const NestedRow = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 4rem);
  column-gap: calc((100% - ${9 * 4}rem) / ${9 - 1});

  @media (${MEDIA_QUERIES.gtXlDesktop}) {
    grid-template-columns: repeat(18, 4rem);
    column-gap: calc((100% - ${18 * 4}rem) / ${18 - 1});
  }
`;
