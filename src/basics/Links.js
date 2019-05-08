import React from "react";
import PropTypes from "prop-types";
import { Link as GatsbyLink } from "gatsby";
import styled, { css } from "styled-components";
import url from "url";
import { Location } from "@reach/router";

import { defaultLocale } from "../constants/i18n";

import { LocaleContext } from "../components/Locale";

const basicLinkStyles = css`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: bolder;
`;
const BasicLink = styled(GatsbyLink)`
  ${basicLinkStyles}
`;
export const ExternalLink = styled.a`
  ${basicLinkStyles}
`;

export const Link = ({ href, ...props }) => {
  const locale = React.useContext(LocaleContext);
  return (
    <Location>
      {({ location }) => {
        const { host } = url.parse(href, location.origin);
        // If a host is defined, it's external
        if (host) {
          return <ExternalLink href={href} {...props} />;
        }
        return (
          <BasicLink
            to={locale === defaultLocale ? href : `/${locale}${href}`}
            {...props}
          />
        );
      }}
    </Location>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
};
