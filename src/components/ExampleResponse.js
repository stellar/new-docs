import React from "react";
import { PrismStyles } from "basics/NewDocPrism";

import styled from "styled-components";
import PropTypes from "prop-types";

import { MethodTable } from "components/MethodTable";

const ExampleResponseEl = styled.div`
  max-height: 56.25rem;
  overflow: auto;
`;

export const ExampleResponse = ({ children, title = "Example" }) => (
  <ExampleResponseEl>
    <MethodTable title={title}>
      <PrismStyles hasNoLineNumber />
      {children}
    </MethodTable>
  </ExampleResponseEl>
);

ExampleResponse.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
