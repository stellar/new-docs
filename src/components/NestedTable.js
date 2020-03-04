import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";
import { Expansion } from "components/Expansion";
import PlusIcon from "assets/icons/icon-plus.svg";
import MinusIcon from "assets/icons/icon-minus.svg";

const NestedTableEl = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    props.isCodeSnippet ? PALETTE.black90 : PALETTE.white};

  strong {
    font-weight: ${FONT_WEIGHT.bold};
  }

  ul {
    padding: 0;
    list-style: none;
    padding: 1.5rem 0;
    display: flex;
    border-bottom: 1px solid ${PALETTE.white60};
    margin: 0;

    &:first-child {
      text-transform: uppercase;
      padding: 1rem 0;
    }

    &:last-child {
      border-bottom: none;
    }
    &:before {
      display: none;
    }

    & > div {
      display: block;

      & > p {
        &:first-child {
          span {
            font-weight: ${FONT_WEIGHT.normal};
          }
        }
        min-width: 10rem;
      }
    }
  }
`;
const ListEl = styled.ul`
  display: flex;
  flex-direction: column;

  p {
    margin: 0%;
  }
`;
const ColumnEl = styled.div`
  color: ${PALETTE.black60};
  line-height: 1.57;
  font-size: 0.875rem;
  min-width: 10rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  font-family: ${FONT_FAMILY.base};

  &:first-child {
    padding-bottom: 2px;
  }
`;
const DataTypeTextEl = styled.span`
  display: block;
  font-family: ${FONT_FAMILY.monospace};
  margin-bottom: 0.5rem;
  color: ${PALETTE.lightGrey};
`;
const RowContentEl = styled(ColumnEl)`
  flex-direction: row;
  font-family: ${FONT_FAMILY.monospace};

  strong {
    font-weight: ${FONT_WEIGHT.bold};
    color: ${PALETTE.black80};
  }

  li {
    margin: 0 0.75rem;
    color: ${PALETTE.lightGrey};
  }
`;
const MonoText = styled.span`
  font-family: ${FONT_FAMILY.monospace};
`;

const DATA_TYPES = {
  string: "string",
  number: "number",
  array: "array",
  boolean: "boolean",
  object: "object",
  null: "null",
  undefined: "undefined",
  "key type": "key type",
};

const ListItem = ({ items }) =>
  items.map(({ props }, i) => {
    const getObjectChild = props.children.filter(
      (item) => typeof item === "object",
    );

    const nestedItems =
      getObjectChild &&
      React.Children.toArray(getObjectChild[0].props.children);

    /* Data Type Value comes from the first level nested list.
    But visually it is separate from the nested list which is why we are using splice method to extract it here */
    const dataTypeItem = nestedItems.splice(0, 1);

    return (
      // eslint-disable-next-line react/no-array-index-key
      <ListEl key={i}>
        <ColumnEl>
          <RowContentEl>
            <strong>{props.children[0]}</strong>
            {dataTypeItem}
          </RowContentEl>
        </ColumnEl>
        <ColumnEl>
          {nestedItems.length > 0 && (
            <NestedItems items={React.Children.toArray(nestedItems)} />
          )}
        </ColumnEl>
      </ListEl>
    );
  });

ListItem.propTypes = {
  items: PropTypes.array.isRequired,
};

const NestedItems = ({ items }) =>
  items.map(({ props }, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Fragment key={index}>
      {React.Children.map(props.children, (child, i) => {
        const dataTypeText = DATA_TYPES[child];

        /* It need to check the type of its child.props.children in order to pass only the ones that are object/array in order to go through its nested children */
        if (child.props && typeof child.props.children === "object") {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ColumnEl key={i}>
              <Expansion
                title="Show child attributes"
                expandedModeTitle="Hide child attributes"
                hasBorder
                collapseIcon={<MinusIcon />}
                expandIcon={<PlusIcon />}
                style={{ marginTop: "1rem" }}
              >
                {React.Children.toArray(child.props.children).map(
                  (grandChildren, j) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={j}>
                      {React.Children.toArray(grandChildren.props.children).map(
                        (nestedEl, k) =>
                          typeof nestedEl === "string" ? (
                            // eslint-disable-next-line react/no-array-index-key
                            <MonoText key={k}>
                              <strong>{nestedEl}</strong>
                            </MonoText>
                          ) : (
                            // eslint-disable-next-line react/no-array-index-key
                            <div style={{ marginBottom: "1rem" }} key={k}>
                              <NestedItems
                                items={React.Children.toArray(
                                  nestedEl.props.children,
                                )}
                              />
                            </div>
                          ),
                      )}
                    </Fragment>
                  ),
                )}
              </Expansion>
            </ColumnEl>
          );
        }
        if (dataTypeText) {
          // eslint-disable-next-line react/no-array-index-key
          return <DataTypeTextEl key={i}>{dataTypeText}</DataTypeTextEl>;
        }
        // eslint-disable-next-line react/no-array-index-key
        return <Fragment key={i}>{child}</Fragment>;
      })}
    </Fragment>
  ));

NestedItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export const NestedTable = React.forwardRef(function NestedTable(
  { children, ...props },
  ref,
) {
  return (
    <NestedTableEl ref={ref} {...props}>
      {React.Children.map(children, (child, i) =>
        child.props ? (
          <ListItem
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            items={React.Children.toArray(child.props.children)}
          />
        ) : (
          child
        ),
      )}
    </NestedTableEl>
  );
});

NestedTable.propTypes = {
  children: PropTypes.node.isRequired,
  hasCodeFormat: PropTypes.bool,
};
