import React from "react";
import PropTypes from "prop-types";
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
  position: relative;
`;
export const DividerEl = styled.span`
  display: inline-block;
  width: 0.0625rem;
  height: 1.5rem;
  margin: 0 1rem;
  background-color: rgba(255, 255, 255, 0.1);
`;
export const Content = styled.article`
  position: relative;
  margin: 0 auto;
`;

const RIGHT_COLUMN_COMPONENTS_NAME = {
  CodeExample: "CodeExample",
  EndpointsTable: "EndpointsTable",
  ExampleResponse: "ExampleResponse",
  NavTable: "NavTable",
};
// API reference has 2 columns, with certain types of content always being in one
// or the other. This component sorts through its children to separate them.
export const ApiReferenceWrapper = ({ children, ...props }) => {
  const rightColumnContent = React.useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => RIGHT_COLUMN_COMPONENTS_NAME[child.props.mdxType],
      ),
    [children],
  );
  const MiddleColumnContent = React.useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => !RIGHT_COLUMN_COMPONENTS_NAME[child.props.mdxType],
      ),
    [children],
  );

  return (
    <React.Fragment>
      <Column xs={5} xl={9}>
        <Content {...props}>{MiddleColumnContent}</Content>
      </Column>
      <Column xs={4} xl={9}>
        {rightColumnContent}
      </Column>
    </React.Fragment>
  );
};
ApiReferenceWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

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
