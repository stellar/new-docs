import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { DEFAULT_COLUMN_WIDTH } from "constants/styles";

import { slugify } from "helpers/slugify";

import { List, ListItem } from "basics/Text";

import { useSidebar } from "./useSidebar";

const El = styled.div`
  width: 100%;
  height: calc(100vh - 121px);
  top: 121px;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;
  position: sticky;
  z-index: 3;
`;
const AbsoluteEl = styled.div`
  position: absolute;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
`;

const NestedUl = styled(List)`
  list-style: none;
  margin: 0;
  padding: 0;

  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const ListItemEl = styled(ListItem)`
  margin: 0;
`;

export const SideNav = ({ children, ...props }) => (
  <El {...props}>
    <AbsoluteEl>{children}</AbsoluteEl>
  </El>
);
SideNav.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SideNavBody = ({
  isOpen = true,
  items,
  renderItem,
  depth = -1,
}) => (
  <NestedUl isOpen={isOpen}>
    {items.map(({ title: subTitle, items: subItems }) => (
      <ListItemEl key={subTitle}>
        <NestedNav
          renderItem={renderItem}
          items={subItems}
          title={subTitle}
          id={slugify(subTitle)}
          isOpen={isOpen}
          depth={depth + 1}
        />
      </ListItemEl>
    ))}
  </NestedUl>
);
SideNavBody.propTypes = {
  isOpen: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.array,
    }),
  ),
  renderItem: PropTypes.func.isRequired,
  depth: PropTypes.number,
};

const NestedNav = ({ id, title, items = [], renderItem, depth = 0 }) => {
  const { isChildActive, isActive } = useSidebar({
    childOptions: items,
    id,
  });
  const isOpen = isChildActive || isActive;

  return (
    <>
      {renderItem({ isActive, title, depth, id })}
      {items && (
        <SideNavBody
          depth={depth}
          isOpen={isOpen}
          items={items}
          renderItem={renderItem}
        />
      )}
    </>
  );
};
NestedNav.propTypes = {
  items: PropTypes.array,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  depth: PropTypes.number,
  activeNode: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }),
};
