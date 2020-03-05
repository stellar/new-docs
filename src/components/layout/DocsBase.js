import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { NAV_THEMES, PALETTE } from "constants/styles";

import { Provider as SideNavProvider } from "components/SideNav";

import LayoutBase from "./LayoutBase";

const navTheme = NAV_THEMES.default;
const theme = {
  body: PALETTE.white,
};

export const DocsBase = (props) => {
  const { children, ...rest } = props;

  return (
    <LayoutBase {...rest}>
      <ThemeProvider theme={(orig) => ({ ...orig, ...theme, ...navTheme })}>
        <SideNavProvider>{children}</SideNavProvider>
      </ThemeProvider>
    </LayoutBase>
  );
};

DocsBase.propTypes = {
  children: PropTypes.node,
};
