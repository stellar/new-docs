import React from "react";
import styled from "styled-components";
import { Trans } from "@lingui/macro";

import { PALETTE, FONT_WEIGHT } from "constants/styles";

import { Link } from "basics/Links";
import { H4, H6 } from "basics/Text";

import { Subscribe } from "./Subscribe";

const El = styled.div`
  display: flex;
  padding-top: 3rem;
  padding-bottom: 6rem;
`;
const ContainerEl = styled.div`
  flex-basis: 50%;
  padding-right: 1rem;
`;
const SubscribeHeadingEl = styled(H4)`
  font-weight: ${FONT_WEIGHT.normal};
  margin: 0;
  margin-bottom: 1rem;
`;
const LittleHeadingEl = styled(H6)`
  text-transform: uppercase;
  font-size: 0.875rem;
  color: ${PALETTE.black80};
  margin: 0;
  margin-bottom: 0.5rem;
`;
const FooterItemEl = styled.div`
  color: ${PALETTE.black60};
  font-size: 0.875rem;
  font-weight: ${FONT_WEIGHT.normal};
  line-height: 1.75;
`;

export const Footer = () => (
  <El>
    <ContainerEl>
      <SubscribeHeadingEl>
        <Trans>Subscribe to developer updates</Trans>
      </SubscribeHeadingEl>
      <Subscribe customBtnColor={PALETTE.darkCoolBlue} />
    </ContainerEl>
    <ContainerEl>
      <LittleHeadingEl>
        <Trans>Dev Resources</Trans>
      </LittleHeadingEl>
      <FooterItemEl>
        <Link href="https://keybase.io/team/stellar.public">
          <Trans>Keybase</Trans>
        </Link>
      </FooterItemEl>
      <FooterItemEl>
        <Link href="https://stellar.stackexchange.com/">
          <Trans>Stack Exchange</Trans>
        </Link>
      </FooterItemEl>
      <FooterItemEl>
        <Link href="https://galactictalk.org/">
          <Trans>GalacticTalk</Trans>
        </Link>
      </FooterItemEl>
    </ContainerEl>
  </El>
);
