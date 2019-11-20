import PropTypes from "prop-types";
import qs from "qs";
import React, { createContext } from "react";

export const FeatureFlagsContext = createContext({});

const FeatureFlags = ({ children, flags = {} }) => {
  const featureFlags = flags;
  if (typeof window !== "undefined") {
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

  return (
    <FeatureFlagsContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

FeatureFlags.propTypes = {
  children: PropTypes.node.isRequired,
  flags: PropTypes.object,
};

export default FeatureFlags;
