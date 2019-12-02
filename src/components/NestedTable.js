import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";
import { Expansion } from "components/Expansion";
import { Text } from "basics/Text";

const NestedTableEl = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    props.isCodeSnippet ? PALETTE.black90 : PALETTE.white};

  ul {
    padding: 0;
    list-style: none;

      &:first-child {
        text-transform: uppercase;
      }
      &:before {
        display: none;
      }

      display: flex;
      border-bottom: 1px solid ${PALETTE.white60};
      margin: 0;

      & > div {
        display: flex;

        & > p {
          &:first-child {
            font-weight: ${FONT_WEIGHT.bold};

            span {
              font-weight: ${FONT_WEIGHT.normal};
            }
          }
          min-width: 10rem;
        }
      }
    }
  }
`;
const ListEl = styled.ul`
  display: flex;

  p {
    margin: 0%;
  }
`;
const ColumnEl = styled.div`
  line-height: 1;
  min-width: 10rem;
  padding: 0;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  font-family: ${FONT_FAMILY.base};
  border-bottom: ${(props) =>
    props.hasBorder ? `1px solid ${PALETTE.white60}` : "none"};
`;
const LabelEl = styled(ColumnEl)`
  padding: 0;
  font-family: ${FONT_FAMILY.monospace};

  strong {
    font-weight: 500;
    color: ${PALETTE.black80};
  }

  span {
    color: ${PALETTE.lightGrey};
  }
`;

const ColumnContentEl = ({ children, hasBorder, ...props }) => (
  <ColumnEl hasBorder {...props}>
    {children}
  </ColumnEl>
);

ColumnContentEl.propTypes = {
  children: PropTypes.node.isRequired,
  hasBorder: PropTypes.bool,
};

const ColumnLabelEl = ({ children, ...props }) => (
  <LabelEl {...props}>{children}</LabelEl>
);

ColumnLabelEl.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Note: This exports a React component instead of a styled-component.
 * [Design Mockup](https://zpl.io/V1DGqJ5)
 */

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
        <ColumnContentEl>
          <ColumnLabelEl>
            <strong>{props.children[0]}</strong>
            <span>{dataTypeItem}</span>
          </ColumnLabelEl>
        </ColumnContentEl>
        <ColumnContentEl>
          {nestedItems.length > 0 && (
            <NestedItems items={React.Children.toArray(nestedItems)} />
          )}
        </ColumnContentEl>
      </ListEl>
    );
  });

ListItem.propTypes = {
  items: PropTypes.array.isRequired,
};

const NestedItems = ({ items }) =>
  items.map(({ props }) =>
    React.Children.map(props.children, (child, i) => {
      /* It need to check the type of its child.props.children in order to pass only the ones that are object/array in order to go through its nested children */
      if (child.props && typeof child.props.children === "object") {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <ColumnContentEl key={i}>
            <Expansion
              title="Hide child attributes"
              hasBorder
              style={{ marginTop: "1rem" }}
            >
              {React.Children.toArray(child.props.children).map(
                (grandChildren) =>
                  React.Children.toArray(grandChildren.props.children).map(
                    (nestedEl) =>
                      typeof nestedEl === "string" ? (
                        <Text>{nestedEl}</Text>
                      ) : (
                        <NestedItems
                          items={React.Children.toArray(
                            nestedEl.props.children,
                          )}
                        />
                      ),
                  ),
              )}
            </Expansion>
          </ColumnContentEl>
        );
      }
      // eslint-disable-next-line react/no-array-index-key
      return <Text key={i}>{child}</Text>;
    }),
  );

NestedItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export const NestedTable = React.forwardRef(function NestedTable(
  { children, ...props },
  ref,
) {
  return (
    <NestedTableEl ref={ref} {...props}>
      {React.Children.map(children, (child) =>
        child.props ? (
          <ListItem items={React.Children.toArray(child.props.children)} />
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
