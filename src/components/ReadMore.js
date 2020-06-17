import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PALETTE } from "constants/styles";

import { ArrowIcon } from "basics/Icons";
import { Link } from "basics/Links";

const ReadMoreLinkEl = styled(Link)`
  display: flex;
  color: ${PALETTE.purple};
  padding-top: 0.4rem;
`;

const InlineArrowIconEl = styled(ArrowIcon)`
  padding-left: 0.4rem;

  svg {
    stroke: ${PALETTE.purple};
  }
`;

export const ReadMore = ({ url }) => (
  <ReadMoreLinkEl href={url}>
    Read More <InlineArrowIconEl direction="right" />
  </ReadMoreLinkEl>
);

ReadMore.propTypes = { url: PropTypes.string.isRequired };
