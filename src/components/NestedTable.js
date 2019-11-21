import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";
import { Expansion } from "components/Expansion";

const NestedTableEl = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    props.isCodeSnippet ? PALETTE.black90 : PALETTE.white};

  ul {
    padding: 0;

    & > li {
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

export const ColumnContentEl = ({ children, hasBorder, ...props }) => (
  <ColumnEl hasBorder {...props}>
    {children}
  </ColumnEl>
);

ColumnContentEl.propTypes = {
  children: PropTypes.node.isRequired,
  hasBorder: PropTypes.bool,
};

export const ColumnLabelEl = ({ children, ...props }) => (
  <LabelEl {...props}>{children}</LabelEl>
);

ColumnLabelEl.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Note: This exports a React component instead of a styled-component.
 * [Design Mockup](https://zpl.io/V1DGqJ5)
 */

const ExpandedListItems = ({ items }) =>
  items.map(({ props }) => (
    <ListEl>
      <ColumnContentEl>
        <ColumnLabelEl>
          <strong>{props.children}</strong>
        </ColumnLabelEl>
      </ColumnContentEl>
    </ListEl>
  ));

ExpandedListItems.propTypes = {
  items: PropTypes.array.isRequired,
};

const ListItem = ({ items }) =>
  items.map(({ props }) => (
    <ListEl>
      <ColumnContentEl>
        <ColumnLabelEl>
          <strong>{props.children[0]}</strong>
          <span>{props.children[1].props.children[0].props.children}</span>
        </ColumnLabelEl>
      </ColumnContentEl>
      <ColumnContentEl>
        {props.children[1].props.children[1].props.children && (
          <NestedItems
            items={React.Children.toArray(
              props.children[1].props.children[1].props.children,
            )}
          />
        )}
      </ColumnContentEl>
    </ListEl>
  ));

ListItem.propTypes = {
  items: PropTypes.array.isRequired,
};

const NestedItems = ({ items }) => {
  const nestedItems =
    items[1] &&
    items[1].props.children &&
    React.Children.toArray(items[1].props.children);

  return (
    <ColumnContentEl>
      {items[0]}
      {nestedItems && (
        <Expansion
          title="Hide child attributes"
          hasBorder
          style={{ marginTop: "1rem" }}
        >
          <ExpandedListItems items={nestedItems} />
        </Expansion>
      )}
    </ColumnContentEl>
  );
};

NestedItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export const NestedTable = React.forwardRef(function NestedTable(
  { children, ...props },
  ref,
) {
  return (
    <NestedTableEl ref={ref} {...props}>
      {children}
    </NestedTableEl>
  );
});

NestedTable.propTypes = {
  children: PropTypes.node.isRequired,
  hasCodeFormat: PropTypes.bool,
};
