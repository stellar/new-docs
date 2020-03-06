import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";

const EndpointEl = styled.div`
  position: relative;
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
  border: 1px solid ${PALETTE.white60};

  &::after {
    content: "";
    z-index: 2;
    position: absolute;
    right: 0;
    width: 2.5rem;
    height: 100%;
    background: rgb(250, 250, 250);
    background: linear-gradient(
      270deg,
      rgba(250, 250, 250, 1) 0%,
      rgba(250, 250, 250, 0.75) 25%,
      rgba(250, 250, 250, 0.5) 50%,
      rgba(250, 250, 250, 0.25) 75%,
      rgba(250, 250, 250, 0) 100%
    );
  }

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
    padding-right: 1.25rem;
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
