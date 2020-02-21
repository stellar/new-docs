import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import components from "constants/docsComponentMapping";
import { DEFAULT_COLUMN_WIDTH, PALETTE } from "constants/styles";

import { slugify } from "helpers/slugify";

import { List, ListItem } from "basics/Text";

import { useSidebar } from "./useSidebar";

const { a: StyledLink } = components;

const El = styled.div`
  width: 100%;
  height: calc(100vh - 171px);
  top: 171px;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;
  position: sticky;
  z-index: 3;
`;
const AbsoluteEl = styled.div`
  position: absolute;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  bottom: 3.25rem;
`;
const DocNavEl = styled.div`
  position: absolute;
  border-top: 1px solid ${PALETTE.white60};
  bottom: 0;
  width: 100%;
  padding: 0.75rem 0;
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

export const SideNav = React.forwardRef(({ children, ...props }, ref) => (
  <El {...props}>
    <AbsoluteEl ref={ref}>{children}</AbsoluteEl>
    <DocNavEl>
      <StyledLink href="/docs">Documentation</StyledLink>
    </DocNavEl>
  </El>
));

SideNav.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SideNavBody = ({
  isOpen = true,
  items,
  renderItem,
  forwardedRef,
  depth = -1,
}) => (
  <NestedUl isOpen={isOpen}>
    {items.map(({ id, title: subTitle, items: subItems, order }, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <ListItemEl key={index}>
        <NestedNav
          renderItem={renderItem}
          forwardedRef={forwardedRef}
          items={subItems}
          title={subTitle}
          id={id}
          isOpen={isOpen}
          isFirstItem={order === 0}
          depth={depth + 1}
        />
      </ListItemEl>
    ))}
  </NestedUl>
);

SideNavBody.propTypes = {
  isOpen: PropTypes.bool,
  forwardedRef: PropTypes.shape({ current: PropTypes.object }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.array,
    }),
  ),
  renderItem: PropTypes.func.isRequired,
  depth: PropTypes.number,
};

const NestedNav = ({
  id = "",
  title,
  items = [],
  renderItem,
  depth,
  forwardedRef,
  isFirstItem,
}) => {
  const uniqueId = id || slugify(title);
  const { isChildActive, isActive } = useSidebar({
    childOptions: items,
    id: uniqueId,
  });
  const isOpen = isChildActive || isActive;

  /* Nested navigation's default index.mdx has the same title as 
    its folder's metadata.json's title which causes redundancy. 
    For example, "Ledgers" navigation is created from metadata.json 
    but its content that is in its index.mdx also has the title "Ledgers"
    which creates two "Ledgers" in the navigation. We are omitting 
    redundancy by skipping renderItem() if that's the case */
  const isSubnavOverview = isFirstItem && depth > 0;

  return (
    <>
      {!isSubnavOverview &&
        renderItem({
          depth,
          id: uniqueId,
          isActive,
          title,
          forwardedRef,
          isFirstItem,
        })}
      {isOpen && items && (
        <>
          {items.map((el, index) => (
            <NestedNav
              renderItem={renderItem}
              id={el.id}
              forwardedRef={forwardedRef}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              items={el.items}
              title={el.title}
              isFirstItem={el.order === 0}
              isOpen={isOpen}
              depth={depth + 1}
            />
          ))}
        </>
      )}
    </>
  );
};

NestedNav.propTypes = {
  items: PropTypes.array,
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  depth: PropTypes.number,
  isFirstItem: PropTypes.bool,
  forwardedRef: PropTypes.shape({ current: PropTypes.object }),
  activeNode: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }),
};
