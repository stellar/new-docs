import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { MEDIA_QUERIES } from "constants/styles";

import { slugify } from "helpers/slugify";

import { Link } from "basics/Links";

import LinkIcon from "assets/icons/link.svg";

// Hash links navigate so that the matching element is at 0px in the window,
// which puts the section heading behind the navbar. It accounts for padding, but
// not margin, which means we can cancel those out to adjust the snap position
// without moving it on the page.
const ScrollHackEl = styled.div`
  padding-top: 5rem;
  margin-top: -5rem;
  display: inline-block;
`;

// We need API Reference to treat these as normal links, so give an escape
// hatch. We also need to be able to override the links, because JS-less
// API ref pages (mostly for SEO but they should probably work right for
// users that hit it) need to adjust the href.
export const makeLinkedHeader = (
  Component,
  { treatIdAsHref = false, LinkComponent = Link } = {},
) => {
  const El = styled(Component)`
    position: relative;
    padding-left: 1.25rem;
    margin-left: -1.25rem;

    @media (${MEDIA_QUERIES.canHover}) {
      &:hover svg {
        visibility: visible;
      }
    }

    & svg {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      visibility: hidden;
    }
  `;

  const WrappedComponent = (props) => {
    const { children } = props;
    const id =
      props.id || slugify(Array.isArray(children) ? children.join() : children);

    return (
      <ScrollHackEl id={id}>
        <El {...props}>
          <LinkComponent href={treatIdAsHref ? id : `#${id}`}>
            <LinkIcon width={16} height={16} />
          </LinkComponent>
          {props.children}
        </El>
      </ScrollHackEl>
    );
  };
  WrappedComponent.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node.isRequired,
  };
  return WrappedComponent;
};
