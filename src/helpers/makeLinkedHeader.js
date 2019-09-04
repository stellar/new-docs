import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { MEDIA_QUERIES } from "constants/styles";

import { slugify } from "helpers/slugify";

import { Link } from "basics/Links";

import LinkIcon from "assets/icons/link.svg";

export const makeLinkedHeader = (Component) => {
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
      <El id={id} {...props}>
        <Link href={`#${id}`}>
          <LinkIcon width={16} height={16} />
        </Link>
        {props.children}
      </El>
    );
  };
  WrappedComponent.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node.isRequired,
  };
  return WrappedComponent;
};
