import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, CSS_TRANSITION_SPEED } from "constants/styles";

const ExpansionHeaderEl = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  height: auto;
  overflow: hidden;
  transition: transform ${CSS_TRANSITION_SPEED.default} ease-out;
`;

const ExpandedSectionEl = styled.div`
  overflow: hidden;
  height: ${(props) => (props.isExpanded ? "auto" : 0)};
  display: ${(props) => (props.isExpanded ? "block" : "none")};
`;

const ExpansionEl = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: ${(props) =>
    props.hasBorder ? `solid 1px ${PALETTE.white60}` : "none"};
  ${ExpansionHeaderEl} {
    border-bottom: ${(props) =>
      props.hasBorder ? `solid 1px ${PALETTE.white60}` : "none"};
    padding: ${(props) => (props.hasBorder ? `1rem` : `1rem 0`)};
  }
  ${ExpandedSectionEl} {
    padding: ${(props) => (props.hasBorder ? `1rem` : `0`)};
  }
`;

const ExpansionIconEl = styled.div`
  display: block;
  width: auto;
  align-items: center;
  justify-content: space-between;
`;

const ExpandedSection = ({ children, isExpanded, ...props }) => {
  const sectionRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setHeight(sectionRef.current.scrollHeight);
  }, [height]);

  return (
    <ExpandedSectionEl ref={sectionRef} isExpanded={isExpanded} {...props}>
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
