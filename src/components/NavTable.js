import React from "react";
import PropTypes from "prop-types";

import { MethodTable } from "components/MethodTable";

export const NavTable = ({ children, title }) => (
  <MethodTable title={title}>{children}</MethodTable>
);

NavTable.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
