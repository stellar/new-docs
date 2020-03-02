import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";

const EndpointEl = styled.div`
  display: flex;
  border-radius: 4px;
  color: ${PALETTE.black60};
  background: ${PALETTE.white80};
  font-family: ${FONT_FAMILY.monospace};
  font-size: 0.875rem;
  height: 2.375rem;
  padding: 0;
  padding-right: 1rem;
  margin: 1rem 0;

  table {
    align-self: center;
    overflow-y: scroll;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  thead {
    display: none;
  }
  tr {
    line-height: 1.2;
    display: flex;
  }
  td {
    white-space: nowrap;
    align-self: center;
  }
  td:first-child {
    padding: 0 1rem;
    font-weight: ${FONT_WEIGHT.bold};
  }
`;

export const Endpoint = ({ children }) => <EndpointEl>{children}</EndpointEl>;

Endpoint.propTypes = {
  children: PropTypes.node.isRequired,
};
