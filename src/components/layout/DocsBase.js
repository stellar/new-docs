import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { NAV_THEMES, PALETTE, THEME } from "constants/styles";

import Footer from "components/Footer";
import Navigation from "components/Navigation";
import { SideNavProvider } from "components/SideNav";
import { StickyNavProvider } from "components/StickyNavContent";

import LayoutBase from "./LayoutBase";

const navTheme = NAV_THEMES.default;
const theme = {
  body: PALETTE.white,
};

export const DocsBase = (props) => {
  const { children, ...rest } = props;

  return (
    <LayoutBase
      {...rest}
      navigation={
        <ThemeProvider theme={{ ...THEME, ...navTheme }}>
          <Navigation scrollOpacity={0} />
        </ThemeProvider>
      }
    >
      <ThemeProvider theme={(orig) => ({ ...orig, ...theme, ...navTheme })}>
        <SideNavProvider>
          <StickyNavProvider>{children}</StickyNavProvider>
        </SideNavProvider>
      </ThemeProvider>
      <Footer />
    </LayoutBase>
  );
};

DocsBase.propTypes = {
  children: PropTypes.node,
};
