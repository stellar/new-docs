import React from "react";
import styled from "styled-components";

import { PALETTE, FONT_WEIGHT, MEDIA_QUERIES } from "constants/styles";

import { Link } from "basics/Links";
import { H4, H6 } from "basics/Text";

import { Subscribe } from "./Subscribe";

const El = styled.div`
  display: flex;
  padding-top: 7.5rem;
  padding-bottom: 6rem;
  justify-content: space-between;

  @media (${MEDIA_QUERIES.ltLaptop}) {
    flex-direction: column;
  }
`;
const ContainerEl = styled.div`
  min-width: 11rem;

  @media (${MEDIA_QUERIES.ltLaptop}) {
    margin-bottom: 1rem;
  }
`;
const SubscribeHeadingEl = styled(H4)`
  font-size: 1.25rem;
  font-weight: ${FONT_WEIGHT.normal};
  color: ${PALETTE.black60};
  margin: 0;
  margin-bottom: 1rem;
`;
const LittleHeadingEl = styled(H6)`
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: ${FONT_WEIGHT.bold};
  color: ${PALETTE.black80};
  margin: 0;
  margin-bottom: 0.5rem;
`;
const FooterItemEl = styled.div`
  color: ${PALETTE.black60};
  font-size: 1rem;
  line-height: 1.75;

  a {
    font-weight: ${FONT_WEIGHT.normal};
  }
`;

export const Footer = () => (
  <El>
    <ContainerEl>
      <SubscribeHeadingEl>Subscribe to developer updates</SubscribeHeadingEl>
      <Subscribe />
    </ContainerEl>
    <ContainerEl>
      <LittleHeadingEl>Dev Resources</LittleHeadingEl>
      <FooterItemEl>
        <Link href="https://keybase.io/team/stellar.public">Keybase</Link>
      </FooterItemEl>
      <FooterItemEl>
        <Link href="https://stellar.stackexchange.com/">Stack Exchange</Link>
      </FooterItemEl>
      <FooterItemEl>
        <Link href="https://galactictalk.org/">GalacticTalk</Link>
      </FooterItemEl>
    </ContainerEl>
  </El>
);
