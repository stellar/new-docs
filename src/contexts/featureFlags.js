import PropTypes from "prop-types";
import qs from "qs";
import React, { createContext } from "react";

import { FEATURE_FLAGS } from "constants/featureFlags";

export const FeatureFlagsContext = createContext({});

const FeatureFlags = ({ children }) => {
  const contextValue = React.useMemo(() => {
    if (typeof window !== "undefined") {
      const featureFlags = { ...FEATURE_FLAGS };
      const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
        decoder: (x) => {
          if (x === "true") return true;
          if (x === "false") return false;
          return x;
        },
      });

      Object.entries(params).forEach(([k, v]) => {
        if (Object.hasOwnProperty.call(featureFlags, k)) {
          featureFlags[k] = v;
        }
      });
    }
  }, []);

  return (
    <FeatureFlagsContext.Provider value={contextValue}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

FeatureFlags.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeatureFlags;
