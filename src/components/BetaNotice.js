import React from "react";
import styled from "styled-components";

import { PALETTE, MEDIA_QUERIES } from "constants/styles";

import { Text, HorizontalRule } from "basics/Text";
import { Link } from "basics/Links";

const BetaNoticeEl = styled(Text)`
  font-size: 1rem;
  margin: 1rem 0;

  & + hr {
    margin-top: 1rem;
  }

  @media (${MEDIA_QUERIES.ltTablet}) {
    display: none;
  }
`;
const LinkEl = styled(Link)`
  color: ${PALETTE.purpleBlue};
`;

export const BetaNotice = () => (
  <>
    <BetaNoticeEl>
      Please submit any typos you come across to{" "}
      <LinkEl href="https://github.com/stellar/new-docs/issues">
        GitHub issues
      </LinkEl>
      .
    </BetaNoticeEl>
    <HorizontalRule />
  </>
);
