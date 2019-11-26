import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, FONT_FAMILY } from "constants/styles";
import { MethodTable } from "components/MethodTable";

const EndpointsTableEl = styled.div`
  max-height: 56.25rem;
  overflow: auto;

  table {
    font-family: ${FONT_FAMILY.monospace};
  }

  a {
    color: ${PALETTE.black60};

    &:hover {
      color: ${PALETTE.black};
    }
  }
`;

export const EndpointsTable = ({ children, title = "Endpoints" }) => (
  <EndpointsTableEl>
    <MethodTable title={title}>{children}</MethodTable>
  </EndpointsTableEl>
);

EndpointsTable.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
