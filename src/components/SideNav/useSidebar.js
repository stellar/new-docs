import React from "react";
import { SideNavProgressContext } from "components/SideNav/Provider";

const flatten = (ary) =>
  ary.reduce(
    (a, b) => a.concat(Array.isArray(b.items) ? flatten(b.items).concat(b) : b),
    [],
  );
const isNodeActive = (ref, id) => ref && id === ref.current.id;

export const useSidebar = ({ childOptions, id }) => {
  const { activeNode } = React.useContext(SideNavProgressContext);
  const flattenedItems = flatten(childOptions);

  const isChildActive = !!flattenedItems.some((item) =>
    isNodeActive(activeNode, item.id),
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
