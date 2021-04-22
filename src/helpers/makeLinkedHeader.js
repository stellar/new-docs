import React from "react";
import PropTypes from "prop-types";

import { loopAndExtractString } from "helpers/extractStringChildren";
import { slugify } from "helpers/slugify";

import { Link } from "basics/Links";

import LinkIcon from "assets/icons/link.svg";

// We need API Reference to treat these as normal links, so give an escape
// hatch. We also need to be able to override the links, because JS-less
// API ref pages (mostly for SEO but they should probably work right for
// users that hit it) need to adjust the href.
export const makeLinkedHeader = (
  Component,
  { treatIdAsHref = false, LinkComponent = Link } = {},
) => {
  const WrappedComponent = (props) => {
    const { children } = props;
    const id = props.id || slugify(loopAndExtractString(children));

    return (
      <Component
        {...props}
        className={`${props.className} linkedHeading`}
        id={id}
      >
        <LinkComponent href={treatIdAsHref ? id : `#${id}`}>
          <LinkIcon width={16} height={16} />
        </LinkComponent>
        {props.children}
      </Component>
    );
  };
  WrappedComponent.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };
  return WrappedComponent;
};
