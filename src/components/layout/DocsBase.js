import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { NAV_THEMES, PALETTE } from "constants/styles";

import { Row, Column, Container } from "basics/Grid";

import { NavFrame } from "components/Navigation/SharedStyles";
import { NavLogo } from "components/Navigation/NavLogo";
import { Provider as SideNavProvider } from "components/SideNav";

import LayoutBase from "./LayoutBase";

const navTheme = NAV_THEMES.default;
const theme = {
  body: PALETTE.white,
};

export const DocsBase = (props) => {
  const { children, navigation, ...rest } = props;

  return (
    <LayoutBase
      {...rest}
      navigation={
        navigation || (
          <ThemeProvider theme={NAV_THEMES.docs}>
            <NavFrame>
              <Container>
                <Row>
                  <Column xs={3}>
                    <NavLogo pageName="Documentation" />
                  </Column>
                </Row>
              </Container>
            </NavFrame>
          </ThemeProvider>
        )
      }
    >
      <ThemeProvider theme={(orig) => ({ ...orig, ...theme, ...navTheme })}>
        <SideNavProvider>{children}</SideNavProvider>
      </ThemeProvider>
    </LayoutBase>
  );
};

DocsBase.propTypes = {
  children: PropTypes.node,
  navigation: PropTypes.node,
};
