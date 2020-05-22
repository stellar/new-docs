import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, CSS_TRANSITION_SPEED } from "constants/styles";

const ExpansionHeaderEl = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  height: auto;
  overflow: hidden;
  transition: transform ${CSS_TRANSITION_SPEED.default} ease-in-out;
`;

const ExpandedSectionEl = styled.div`
  overflow: hidden;
  transition: height ${CSS_TRANSITION_SPEED.default} ease-in-out;
  ${(props) =>
    props.isExpanded
      ? `
  height: ${props.originalHeight};
  display: block;`
      : `
  height: 0px;`}
`;

const ExpansionEl = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: none;

  ${ExpansionHeaderEl} {
    padding: 1rem 0;
  }
  ${ExpandedSectionEl} {
    padding: 0;
  }

  ${({ hasBorder }) =>
    hasBorder &&
    css`
      ${ExpansionHeaderEl} {
        border: solid 1px ${PALETTE.white60};
        padding: 1rem;
      }
      ${ExpandedSectionEl} {
        padding: 1rem;
        border-top: none;
        border-right: solid 1px ${PALETTE.white60};
        border-left: solid 1px ${PALETTE.white60};
        border-bottom: solid 1px ${PALETTE.white60};
      }
    `}
`;

const ExpansionIconEl = styled.div`
  display: block;
  width: auto;
  align-items: center;
  justify-content: space-between;
`;

export const ExpandedSection = ({ children, isExpanded, ...props }) => {
  const sectionRef = React.useRef(null);
  const [originalHeight, setHeight] = React.useState("auto");

  React.useLayoutEffect(() => {
    setHeight(`${sectionRef.current.scrollHeight / 16}rem`);
  }, []);

  return (
    <ExpandedSectionEl
      {...props}
      ref={sectionRef}
      isExpanded={isExpanded}
      originalHeight={originalHeight}
    >
      {children}
    </ExpandedSectionEl>
  );
};

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
      hasBorder={hasBorder}
      aria-expanded={isExpanded}
      ref={ref}
      {...props}
    >
      <ExpansionHeaderEl onClick={onHandleClick}>
        {isExpanded ? expandedModeTitle : title}
        <ExpansionIconEl>
          {isExpanded ? collapseIcon : expandIcon}
        </ExpansionIconEl>
      </ExpansionHeaderEl>
      <ExpandedSection isExpanded={isExpanded}>{children}</ExpandedSection>
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
