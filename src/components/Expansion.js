import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, CSS_TRANSITION_SPEED } from "constants/styles";

const ExpansionHeaderEl = styled.div`
  cursor: pointer;
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  height: auto;
  overflow: hidden;
  transition: transform ${CSS_TRANSITION_SPEED.default} ease-out;
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
  }
`;

const ExpansionIconEl = styled.div`
  display: block;
  width: auto;
  align-items: center;
  justify-content: space-between;
`;

const ExpandedSectionEl = styled.div`
  display: block;
  overflow: hidden;
  padding: ${(props) => (props.isExpanded ? "1rem" : "0 1rem")};
  height: ${(props) => (props.isExpanded ? "auto" : 0)};
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
    ...props
  },
  ref,
) {
  const [isExpanded, setExpanded] = React.useState(false);
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
  expandIcon: PropTypes.node.isRequired,
  collapseIcon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
