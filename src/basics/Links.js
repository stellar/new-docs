import React from "react";
import PropTypes from "prop-types";
import { Link as GatsbyLink } from "gatsby";
import styled, { css } from "styled-components";
import url from "url";
import { Location } from "@reach/router";

import { IS_PRODUCTION } from "constants/env";
import { FONT_WEIGHT } from "constants/styles";

const basicLinkStyles = css`
  text-decoration: none;
  color: inherit;
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 1.5;
`;
const BasicLink = styled(GatsbyLink)`
  ${basicLinkStyles};
`;
export const ExternalLink = styled.a`
  ${basicLinkStyles};
`;

export const Link = ({ href, newTab, ...props }) => {
  const finalProps = {
    ...props,
    ...(newTab && { rel: "noreferrer", target: "_blank" }),
  };
  if (!href && !IS_PRODUCTION) {
    // dev-only warning so links don't asplode
    // eslint-disable-next-line no-console
    console.warn(`A link was made with no href. Children is ${props.children}`);
    return <span {...finalProps} />;
  }

  return (
    <Location>
      {({ location }) => {
        const { host } = url.parse(href, location.origin);
        // If a host is defined, it's external. We also want the browser to
        // handle hash links.
        if (host || href[0] === "#") {
          return <ExternalLink href={href} {...finalProps} />;
        }
        return <BasicLink to={href} {...finalProps} />;
      }}
    </Location>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  newTab: PropTypes.bool,
};
