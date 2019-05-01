import React from "react";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";

import { defaultLocale } from "../constants/i18n";

import { LocaleContext } from "../components/Locale";

const basicLinkStyles = ``;
const BasicLink = styled(GatsbyLink)`
  ${basicLinkStyles}
`;
export const ExternalLink = styled.a`
  ${basicLinkStyles}
`;

export const Link = ({ to, href, ...props }) => {
  const locale = React.useContext(LocaleContext);
  if (href) {
    return <ExternalLink href={href} {...props} />;
  }
  return (
    <BasicLink
      to={locale === defaultLocale ? to : `/${locale}${to}`}
      {...props}
    />
  );
};
