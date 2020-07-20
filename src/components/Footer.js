import React from "react";
import styled from "styled-components";

import { PALETTE, FONT_WEIGHT, MEDIA_QUERIES } from "constants/styles";

import { Link } from "basics/Links";
import { H4, H6 } from "basics/Text";

import { Subscribe } from "components/Footer/Subscribe";

const El = styled.div`
  padding-top: 7.5rem;
  padding-bottom: 1rem;
  color: ${PALETTE.black60};

  @media (${MEDIA_QUERIES.ltDesktop}) {
    padding-top: 4.5rem;
  }
`;
const RowEl = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  @media (${MEDIA_QUERIES.ltDesktop}) {
    flex-direction: column;
  }
`;
const ContainerEl = styled.div`
  min-width: 11rem;

  @media (${MEDIA_QUERIES.ltDesktop}) {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
`;
const SubscribeHeadingEl = styled(H4)`
  font-size: 1.25rem;
  font-weight: ${FONT_WEIGHT.normal};
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
  font-size: 1rem;
  line-height: 1.75;

  a {
    font-weight: ${FONT_WEIGHT.normal};
  }
`;
const InlineLinkEl = styled(Link)`
  font-weight: ${FONT_WEIGHT.normal};
  margin-right: 2rem;
`;

export const Footer = () => (
  <El>
    <RowEl>
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
    </RowEl>
    <RowEl>
      <ContainerEl>
        <InlineLinkEl href="https://www.stellar.org/privacy-policy" newTab>
          Privacy Policy
        </InlineLinkEl>{" "}
        <InlineLinkEl href="https://www.stellar.org/terms-of-service" newTab>
          Terms of Service
        </InlineLinkEl>
      </ContainerEl>
    </RowEl>
  </El>
);
