import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { MEDIA_QUERIES } from "constants/styles";

import { slugify } from "helpers/slugify";
import { useMatchMedia } from "helpers/useMatchMedia";

import { List, ListItem } from "basics/Text";

import { NavLogo } from "components/Navigation/NavLogo";
import { StickyEl } from "components/Navigation/SharedStyles";

import { useSidebar } from "./useSidebar";

const NestedUl = styled(List)`
  list-style: none;
  margin: 0;
  padding: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;
const ListItemEl = styled(ListItem)`
  margin: 0;
`;

/* Check to see if the parent directory has index.mdx */
const checkIfOverview = (relativePath) => {
  const pathSegments = relativePath.split("/");
  return pathSegments[pathSegments.length - 1] === "index.mdx";
};

export const SideNav = ({ children, docType, ...props }) => (
  <StickyEl {...props}>
    {docType && <NavLogo pageName={docType} />}
    {children}
  </StickyEl>
);

SideNav.propTypes = {
  children: PropTypes.node.isRequired,
  docType: PropTypes.string,
};

export const SideNavBody = ({
  isOpen = true,
  items,
  renderItem,
  forwardedRef,
  depth = -1,
}) => (
  <NestedUl isOpen={isOpen}>
    {items.map(
      ({ id, title: subTitle, items: subItems, order, parent }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItemEl key={index}>
          <NestedNav
            renderItem={renderItem}
            forwardedRef={forwardedRef}
            items={subItems}
            title={subTitle}
            id={id}
            isOpen={isOpen}
            isFirstItem={
              order === 0 && parent && checkIfOverview(parent.relativePath)
            }
            depth={depth + 1}
          />
        </ListItemEl>
      ),
    )}
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
  const isMobile = useMatchMedia(`(${MEDIA_QUERIES.ltLaptop})`);

  /* On Mobile, SideNav's stay sticky and highlight as you scroll is disabled
  Therefore, SideNav is displaying all of its sub navigation items by default on mobile
  Its example can be seen in /api */
  const isOpen = isMobile ? true : isChildActive || isActive;

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
          {items.map((subnavItem, index) => (
            <NestedNav
              renderItem={renderItem}
              id={subnavItem.id}
              forwardedRef={forwardedRef}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              items={subnavItem.items}
              title={subnavItem.title}
              relativePath={subnavItem.parent?.relativePath}
              isFirstItem={
                subnavItem.order === 0 &&
                subnavItem.parent &&
                checkIfOverview(subnavItem.parent.relativePath)
              }
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
