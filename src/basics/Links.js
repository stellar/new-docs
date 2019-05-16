import React from "react";
import PropTypes from "prop-types";
import { Link as GatsbyLink } from "gatsby";
import styled, { css } from "styled-components";
import url from "url";
import { Location } from "@reach/router";

import { defaultLocale } from "constants/i18n";

import { LocaleContext } from "components/Locale";

const basicLinkStyles = css`
  text-decoration: none;
  color: inherit;
  font-weight: bolder;
`;
const BasicLink = styled(GatsbyLink)`
  ${basicLinkStyles};
`;
export const ExternalLink = styled.a`
  ${basicLinkStyles};
`;

export const Link = ({ href, ...props }) => {
  const locale = React.useContext(LocaleContext);
  if (!href && process.env.NODE_ENV !== "production") {
    // dev-only warning so links don't asplode
    // eslint-disable-next-line no-console
    console.warn(`A link was made with no href. Children is ${props.children}`);
    return <span {...props} />;
  }
  return (
    <Location>
      {({ location }) => {
        const { host } = url.parse(href, location.origin);
        // If a host is defined, it's external. We also want the browser to
        // handle hash links.
        if (host || href[0] === "#") {
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
  children: PropTypes.node.isRequired,
};
