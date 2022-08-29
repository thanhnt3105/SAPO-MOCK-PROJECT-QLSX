import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import { BrowserView, MobileView } from "react-device-detect";
import PerfectScrollbar from "react-perfect-scrollbar";
import { drawerWidth } from "../../../constants/const";
import MenuList from "../Sidebar/MenuList";
import LogoSection from "../LogoSection/index";

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 3, mx: "auto" }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component='div'
          style={{
            height: !matchUpMd ? "calc(100vh - 55px)" : "calc(100vh - 88px)",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <MenuList />
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <Box
        component='nav'
        sx={{ flexShrink: { md: 0 }, width: matchUpMd ? 250 : "auto" }}
        aria-label='mailbox folders'
      >
        <Drawer
          container={container}
          variant={matchUpMd ? "persistent" : "temporary"}
          anchor='left'
          open={drawerOpen}
          onClose={drawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              borderRight: "none",
              [theme.breakpoints.up("md")]: {
                top: "88px",
              },
            },
          }}
          ModalProps={{ keepMounted: true }}
          color='inherit'
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
