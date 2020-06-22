import React from "react";
import PropTypes from "prop-types";
import { Link as GatsbyLink } from "gatsby";
import styled, { css } from "styled-components";
import urlLib from "url";
import { useLocation, navigate } from "@reach/router";

import { IS_PRODUCTION } from "constants/env";
import { LINK_DESTINATIONS } from "constants/routes";
import { FONT_WEIGHT } from "constants/styles";

import {
  resolveRelativePath,
  getLinkTarget,
  isRelativeUrl,
  isHashUrl,
} from "helpers/routes";

import { Context as ScrollRouterContext } from "components/ApiRefRouting/ScrollRouter";

const basicLinkStyles = css`
  text-decoration: none;
  color: inherit;
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 1.5;
`;
const StyledLink = styled(GatsbyLink)`
  ${basicLinkStyles};
`;
export const ExternalLink = styled.a`
  ${basicLinkStyles};
`;

export const BasicLink = ({ href, newTab, ...props }) => {
  const location = useLocation();

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

  const { host } = urlLib.parse(href, location.origin);
  // If a host is defined, it's external. We also want the browser to
  // handle hash links.
  if (host || href[0] === "#") {
    return <ExternalLink href={href} {...finalProps} />;
  }
  return <StyledLink to={href} {...finalProps} />;
};
BasicLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  newTab: PropTypes.bool,
};

export const OriginalFileContext = React.createContext("");

/**
 * Links, unfortunately, are complex due to the variety of page types.
 *
 * We have some external links, which we don't want to pass to Gatsby Link
 * components. /docs subpages are all regular Gatsby pages, so those need to use
 * Gatsby Link components. / api pages are different positions on the page, so we
 * have to handle clicks  ourselves, in ScrollRouter. For SEO/UX reasons, each /
 * api subpage has an  equivalent that is displayed if JS is disabled,
 * communicated via a ?javascript=false querystring.
 *
 * Additionally, all of the links need to work correctly both within GitHub and
 * on the production site. Because of the constraints of GitHub, that means
 * they're authored as relative paths.
 *
 * This means that we need to know 3 things in order to properly construct a link:
 *
 * - What page the browser is on
 * - Where the link is destined for
 * - What file created the link
 *
 * With the original file and relative path to the destination, we can resolve
 * that into a complete pathname. With the current page and the destination, we
 * can determine what type of component is needed.
 *
 *                  Coming from →
 *          |       | api          | docs    | no-js   | external |
 * Going to | ----- | ------------ | ------- | ------- | -------- |
 *    ↓     | api   | ScrollRouter | <Link>  |         | <a>      |
 *          | docs  | <Link>       | <Link>  |         | <a>      |
 *          | no-js | <a>-ish      | <a>-ish | <a>-ish | <a>      |
 *
 * To ensure that /no-js pages display as intended if JS is disabled, we need to
 * detect if the current page is being accessed with javascript=false, and pass
 * it through if so.
 */

export const Link = ({ href, newTab, ...props }) => {
  const location = useLocation();
  const originalFilePath = React.useContext(OriginalFileContext);

  const { url, destinationType } = React.useMemo(() => {
    if (isHashUrl(href)) {
      return {
        url: href,
        destinationType: LINK_DESTINATIONS.hash,
      };
    }
    const destination = urlLib.parse(href);

    if (isRelativeUrl(href)) {
      destination.pathname = resolveRelativePath(
        originalFilePath,
        destination.pathname || "",
      );
    }
    // If the page is being generated with a /no-js url, then we need to make
    // sure the links render with the right querystring so they load correctly
    // when clicked.
    if (destination.pathname?.startsWith("/no-js")) {
      destination.query = destination.query
        ? `${destination.query}&javascript=false`
        : "javascript=false";
    }
    const finalUrl = urlLib.format(destination);
    return {
      url: finalUrl,
      destinationType: getLinkTarget(finalUrl),
    };
  }, [href, originalFilePath]);

  switch (destinationType) {
    case LINK_DESTINATIONS.api:
      if (location.pathname.startsWith("/api")) {
        return (
          // We can't do `useContext(ScrollRouterContext)` because the provider
          // won't always be present. Can't conditionally use hooks.
          <ScrollRouterContext.Consumer>
            {({ onLinkClick }) => (
              <BasicLink
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onLinkClick(url);
                }}
                href={url}
                {...props}
              />
            )}
          </ScrollRouterContext.Consumer>
        );
      }
      return <BasicLink href={url} {...props} />;
    case LINK_DESTINATIONS.docs:
    case LINK_DESTINATIONS.hash:
      return <BasicLink onClick={() => navigate(url)} href={url} {...props} />;
    case LINK_DESTINATIONS.external:
    default:
      return <BasicLink newTab href={url} {...props} />;
  }
};
Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  newTab: PropTypes.bool,
};
