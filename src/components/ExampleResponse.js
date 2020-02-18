import React from "react";
import PropTypes from "prop-types";

import { PrismStyles } from "basics/Prism";
import { MethodTable } from "components/MethodTable";

export const ExampleResponse = ({ children, title = "Example" }) => (
  <MethodTable title={title}>
    <PrismStyles />
    {children}
  </MethodTable>
);

ExampleResponse.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
};
