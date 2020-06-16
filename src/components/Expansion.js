import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";

import { PALETTE, CSS_TRANSITION_SPEED } from "constants/styles";

import { BasicButton } from "basics/Buttons";

const ExpansionHeaderEl = styled(BasicButton)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const ExpansionEl = styled.div.attrs((props) => ({
  "aria-expanded": props.isExpanded,
}))`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: none;

  ${ExpansionHeaderEl} {
    padding: 1rem 0;
  }

  & .ReactCollapse--collapse {
    transition: height ${CSS_TRANSITION_SPEED.default};
  }

  ${({ hasBorder }) =>
    hasBorder &&
    css`
      ${ExpansionHeaderEl} {
        border: solid 1px ${PALETTE.white60};
        padding: 1rem;
      }
    `}
`;

const ExpansionIconEl = styled.div`
  display: block;

  width: auto;
  align-items: center;
  justify-content: space-between;
`;

export const ExpandedSection = Collapse;

ExpandedSection.propTypes = {
  /**
   * If true, expands the section, otherwise collapse it. Setting this prop enables control over the panel.
   */
  isExpanded: PropTypes.bool,
  /**
   * The content of the expansion component.
   */
  children: PropTypes.node.isRequired,
};

export const Expansion = React.forwardRef(function Expansion(
  {
    title,
    expandedModeTitle,
    hasBorder = false,
    expandIcon,
    collapseIcon,
    children,
    isDefaultExpanded = false,
    ...props
  },
  ref,
) {
  const [isExpanded, setExpanded] = React.useState(isDefaultExpanded);
  const onHandleClick = () => {
    setExpanded(!isExpanded);
  };

  return (
    <ExpansionEl
      {...props}
      hasBorder={hasBorder}
      isExpanded={isExpanded}
      ref={ref}
    >
      <ExpansionHeaderEl onClick={onHandleClick}>
        {isExpanded ? expandedModeTitle : title}
        <ExpansionIconEl>
          {isExpanded ? collapseIcon : expandIcon}
        </ExpansionIconEl>
      </ExpansionHeaderEl>
      <Collapse isOpened={isExpanded}>{children}</Collapse>
    </ExpansionEl>
  );
});

Expansion.propTypes = {
  title: PropTypes.node.isRequired,
  expandedModeTitle: PropTypes.node.isRequired,
  hasBorder: PropTypes.bool,
  isDefaultExpanded: PropTypes.bool,
  expandIcon: PropTypes.node.isRequired,
  collapseIcon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
