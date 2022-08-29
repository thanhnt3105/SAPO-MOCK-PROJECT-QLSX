import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Fade,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/actions/actionAuth";

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, route = "") => {
    handleClose(event);
    if (route && route !== "") {
      navigate(route);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "50px",
          alignItems: "center",
          borderRadius: "30px",
          transition: "all .25s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup='true'
            color='inherit'
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size='1.5rem'
            color={theme.palette.primary.main}
          />
        }
        variant='outlined'
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        color='primary'
      />
      <Popper
        placement='bottom-end'
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Container
              sx={{
                mt: 1,
                boxShadow: 15,
                borderRadius: 5,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Box sx={{ p: 0.5, pt: 1.5 }}>
                <Stack>
                  <Stack
                    direction='row'
                    spacing={0.5}
                    alignItems='center'
                    sx={{ justifyContent: "center" }}
                  >
                    {user?.username ? (
                      <Typography
                        component='span'
                        variant='h4'
                        sx={{ fontWeight: 700 }}
                      >
                        {user.username}
                      </Typography>
                    ) : (
                      <Typography
                        component='span'
                        variant='h4'
                        sx={{ fontWeight: 700 }}
                      >
                        Tên Của Bạn
                      </Typography>
                    )}
                  </Stack>
                  <Stack
                    direction='row'
                    spacing={0.5}
                    alignItems='center'
                    sx={{ justifyContent: "center", mt: 1 }}
                  >
                    <Typography variant='h6'>Vai Trò:</Typography>
                    {user?.roles ? (
                      <Typography variant='subtitle2'>{user.roles}</Typography>
                    ) : (
                      <Typography variant='subtitle2'>
                        Không Xác Định
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                <Divider />
              </Box>
              <Box sx={{ p: 0.5 }}>
                <List
                  component='nav'
                  sx={{
                    width: "100%",
                    maxWidth: 300,
                    minWidth: 250,
                    borderRadius: "10px",
                    [theme.breakpoints.down("md")]: {
                      minWidth: "100%",
                    },
                    "& .MuiListItemButton-root": {
                      mt: 0.5,
                    },
                  }}
                >
                  <ListItemButton
                    onClick={(event) => handleListItemClick(event, "/user")}
                    sx={{
                      borderRadius: 10,
                    }}
                  >
                    <ListItemIcon>
                      <IconUser stroke={1.5} size='1.25rem' />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant='body2'>
                          Tài Khoản Của Bạn
                        </Typography>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton
                    onClick={handleLogout}
                    sx={{
                      borderRadius: 10,
                    }}
                  >
                    <ListItemIcon>
                      <IconLogout stroke={1.5} size='1.25rem' />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant='body2'>Đăng Xuất</Typography>
                      }
                    />
                  </ListItemButton>
                </List>
              </Box>
            </Container>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
