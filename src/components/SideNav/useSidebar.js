import React from "react";

import { slugify } from "helpers/slugify";

import { SideNavProgressContext } from "components/SideNav/Provider";

const flatten = (ary) =>
  ary.reduce(
    (a, b) => a.concat(Array.isArray(b.items) ? flatten(b.items).concat(b) : b),
    [],
  );
const isNodeActive = (ref, id) =>
  ref && document.getElementById(id) === ref.current;

export const useSidebar = ({ childOptions, id }) => {
  const { activeNode } = React.useContext(SideNavProgressContext);

  const flattenedItems = flatten(childOptions);

  const isChildActive = !!flattenedItems.some((item) =>
    isNodeActive(activeNode, slugify(item.title)),
  );
  const isActive = !!isNodeActive(activeNode, id);
  return React.useMemo(
    () => ({
      activeNode,
      isActive,
      isChildActive,
    }),
    [activeNode, isActive, isChildActive],
  );
};
