import React from "react";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";

import { defaultLocale } from "../constants/i18n";

import { LocaleContext } from "../components/Locale";

const basicLinkStyles = `
  text-decoration: none;
`;
const BasicLink = styled(GatsbyLink)`
  ${basicLinkStyles}
`;
export const ExternalLink = styled.a`
  ${basicLinkStyles}
`;

export const Link = ({ href, ...props }) => {
  const locale = React.useContext(LocaleContext);

  const { href: derivedHref } = new URL(href, location.origin);

  // If these are equal, it's an external link
  if (href === derivedHref) {
    return <ExternalLink href={href} {...props} />;
  }
  return (
    <BasicLink
      to={locale === defaultLocale ? href : `/${locale}${href}`}
      {...props}
    />
  );
};
