import React from "react";
import { SideNavProgressContext } from "components/SideNav/Provider";

const flatten = (ary) =>
  ary.reduce(
    (a, b) => a.concat(Array.isArray(b.items) ? flatten(b.items).concat(b) : b),
    [],
  );

export const useSidebar = ({ childOptions, id }) => {
  const { activeContent } = React.useContext(SideNavProgressContext);

  return React.useMemo(() => {
    const isChildActive = !!flatten(childOptions).some(
      (item) => activeContent.id === item.id,
    );
    const isActive = activeContent.id === id;

    return {
      isActive,
      isChildActive,
    };
  }, [activeContent, id, childOptions]);
};
