import styled from "styled-components";

import { MEDIA_QUERIES } from "constants/styles";

import { Column, Container as GridContainer, gridHelpers } from "basics/Grid";

export const Container = styled(GridContainer)`
  && {
    margin: 0;
    min-width: 80rem;
    max-width: 140rem;
  }
`;
export const SideNavColumn = styled(Column)`
  position: sticky;
  height: 100vh;
  top: 0;
`;
export const Content = styled.article`
  position: relative;
  margin: 0 auto;
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
