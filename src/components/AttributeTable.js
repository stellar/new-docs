import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";

import { buildAttributesList } from "helpers/documentation";

import { Text, MonoText } from "basics/Text";

import { Expansion } from "components/Expansion";
import PlusIcon from "assets/icons/icon-plus.svg";
import MinusIcon from "assets/icons/icon-minus.svg";

const El = styled.ul`
  background: ${(props) =>
    props.isCodeSnippet ? PALETTE.black90 : PALETTE.white};
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  font-family: ${FONT_FAMILY.base};
  color: ${PALETTE.black60};

  & > ${ListItemEl}:first-of-type {
    // text-transform: uppercase;
    padding: 1rem 0;
  }
`;
const ListItemEl = styled.li`
  list-style: none;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${PALETTE.white60};
  margin: 0;

  &:last-child {
    border-bottom: none;
  }
`;
const DataTypeTextEl = styled(MonoText)`
  padding: 0 0.75rem;
  color: ${PALETTE.lightGrey};
`;
const AttributeNameEl = styled(MonoText)`
  font-weight: ${FONT_WEIGHT.bold};
  color: ${PALETTE.black80};
`;
const DescriptionEl = styled(Text)`
  margin: 0;
  color: ${PALETTE.black60};
`;
const SubAttributesEl = styled.ul`
  min-width: 10rem;
  padding: 1rem;

  & ${ListItemEl}:first-child {
    padding-top: 0;
  }
  & ${ListItemEl}:last-child {
    padding-bottom: 0;
  }

  & ${AttributeNameEl} {
    color: ${PALETTE.black60};
  }
`;

const AttributeList = ({ attributes }) => (
  <>
    {attributes.map(({ name, type, description, childAttributes }) => (
      <ListItemEl key={name}>
        <AttributeNameEl>{name}</AttributeNameEl>
        <DataTypeTextEl>{type}</DataTypeTextEl>
        <DescriptionEl>{description}</DescriptionEl>
        {childAttributes && (
          <Expansion
            title="Show child attributes"
            expandedModeTitle="Hide child attributes"
            hasBorder
            collapseIcon={<MinusIcon />}
            expandIcon={<PlusIcon />}
            style={{ marginTop: "1rem" }}
          >
            <SubAttributesEl>
              <AttributeList attributes={childAttributes} />
            </SubAttributesEl>
          </Expansion>
        )}
      </ListItemEl>
    ))}
  </>
);

AttributeList.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.node.isRequired,
      type: PropTypes.node,
      description: PropTypes.node.isRequired,
      childAttributes: PropTypes.array,
    }),
  ).isRequired,
};

export const AttributeTable = React.forwardRef(function AttributeTable(
  { children, ...props },
  ref,
) {
  const attributes = buildAttributesList(children);

  return (
    <El ref={ref} {...props}>
      <AttributeList attributes={attributes} />
    </El>
  );
});

AttributeTable.propTypes = {
  children: PropTypes.node.isRequired,
};
