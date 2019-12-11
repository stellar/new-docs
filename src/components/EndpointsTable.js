import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";
import { MethodTable } from "components/MethodTable";

const EndpointsTableEl = styled.div`
  max-height: 56.25rem;
  overflow: auto;
  display: flex;
  font-size: 0.875rem;

  table {
    align-self: center;
    font-family: ${FONT_FAMILY.monospace};
  }

  tr {
    line-height: 1.57;
    height: 1.75rem;
    display: flex;
  }

  td,
  a {
    align-self: center;
  }

  td:first-child {
    width: 5rem;
    padding: 0;
    padding-right: 1rem;
    font-weight: ${FONT_WEIGHT.bold};
  }

  a {
    color: ${PALETTE.black60};
    font-weight: ${FONT_WEIGHT.normal};

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
