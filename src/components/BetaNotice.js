import React from "react";
import styled from "styled-components";

import { PALETTE, MEDIA_QUERIES } from "constants/styles";

import { Text, HorizontalRule } from "basics/Text";
import { Link } from "basics/Links";

const BetaNoticeEl = styled(Text)`
  font-size: 1rem;
  margin: 2rem 0;

  @media (${MEDIA_QUERIES.ltTablet}) {
    display: none;
  }
`;
const HrEl = styled(HorizontalRule)`
  margin-bottom: 0;
`;
const LinkEl = styled(Link)`
  color: ${PALETTE.purpleBlue};
`;

export const BetaNotice = () => (
  <>
    <BetaNoticeEl>
      These new docs are in beta. Please submit bugs to{" "}
      <LinkEl href="https://github.com/stellar/new-docs/issues">
        GitHub issues
      </LinkEl>
      .
    </BetaNoticeEl>
    <HrEl />
  </>
);
