import PropTypes from "prop-types";
import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MENU_OPEN,
  SET_MENU,
} from "../../../../../redux/actions/actionSidebar";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size='1.25rem' />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: sidebar.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: sidebar.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }
  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const handleExpandItem = (id) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ListItemButton
        {...listItemProps}
        disabled={item.disabled}
        sx={{
          borderRadius: `${sidebar.borderRadius}px`,
          mb: 0.5,
          alignItems: "flex-start",
          backgroundColor: level > 1 ? "transparent !important" : "inherit",
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 20}px`,
        }}
        selected={sidebar.isOpen.findIndex((id) => id === item.id) > -1}
        onClick={() => handleExpandItem(item.id)}
      >
        <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
          {itemIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={
                sidebar.isOpen.findIndex((id) => id === item.id) > -1
                  ? "h5"
                  : "body1"
              }
              color='inherit'
            >
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography
                variant='caption'
                sx={{ ...theme.typography.subMenuCaption }}
                display='block'
                gutterBottom
              >
                {item.caption}
              </Typography>
            )
          }
        />
      </ListItemButton>
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
