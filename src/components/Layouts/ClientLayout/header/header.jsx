import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AuthContext } from "../../../../providers/AuthProvider";
import Modal from "../../../ui/modal";
import PersonOutline from "@mui/icons-material/PersonOutline";
import Settings from "@mui/icons-material/Settings";
import ExitToApp from "@mui/icons-material/ExitToApp";

const pages = [
  { content: "Đội ngũ bác sĩ", to: "/doi-ngu-bac-si" },
  {
    content: "Dịch vụ",
    children: [
      { content: "Khám tổng quát", to: "/dich-vu/tong-quat" },
      { content: "Khám chuyên sâu", to: "/dich-vu/chuyen-sau" },
    ],
  },
  { content: "Về chúng tôi", to: "/ve-chung-toi" },
  { content: "Liên hệ", to: "/lien-he" },
];

const settings = [
  {
    id: 1,
    label: "Hồ sơ",
    to: "/profile",
    icon: <PersonOutline fontSize="small" />,
  },
  {
    id: 2,
    label: "Cài đặt",
    to: "/settings",
    icon: <Settings fontSize="small" />,
  },
  {
    id: 3,
    label: "Đăng xuất",
    action: "logout",
    icon: <ExitToApp fontSize="small" />,
    danger: true,
  },
];

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const isLoggedIn = !!user;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openMegaMenu, setOpenMegaMenu] = useState(null);

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleOpenMegaMenu = (content) => setOpenMegaMenu(content);
  const handleCloseMegaMenu = () => setOpenMegaMenu(null);

  const handleMenuClick = () => {
    handleCloseNavMenu();
    handleCloseMegaMenu();
  };

  const handleConfirmLogout = () => {
    logout();
    setOpenLogoutModal(false);
  };

  const userInitials = user?.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : "U";

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* LOGO Desktop */}
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            {/* Menu Mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page, index) =>
                  page.children ? (
                    <Box key={index}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography fontWeight="bold">
                          {page.content}
                        </Typography>
                      </MenuItem>
                      {page.children.map((child, i) => (
                        <MenuItem
                          key={i}
                          component={Link}
                          to={child.to}
                          onClick={handleMenuClick}
                          sx={{ pl: 4 }}
                        >
                          {child.content}
                        </MenuItem>
                      ))}
                    </Box>
                  ) : (
                    <MenuItem
                      key={index}
                      component={Link}
                      to={page.to}
                      onClick={handleMenuClick}
                    >
                      <Typography>{page.content}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>

            {/* LOGO Mobile */}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            {/* Menu Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) =>
                page.children ? (
                  <Box
                    key={index}
                    sx={{ display: "inline-block", position: "relative" }}
                    onMouseEnter={() => handleOpenMegaMenu(page.content)}
                    onMouseLeave={handleCloseMegaMenu}
                  >
                    <Button
                      sx={{ my: 2, display: "flex", gap: 0.5 }}
                      color="inherit"
                    >
                      {page.content} <ArrowDropDownIcon fontSize="small" />
                    </Button>

                    {openMegaMenu === page.content && (
                      <Box
                        sx={{
                          position: "absolute",
                          width: "200px",
                          top: "100%",
                          left: 0,
                          bgcolor: "background.paper",
                          boxShadow: 3,
                          display: "flex",
                          flexDirection: "column",
                          py: 1,
                          px: 2,
                          zIndex: 999,
                        }}
                      >
                        {page.children.map((child, i) => (
                          <Button
                            key={i}
                            component={Link}
                            to={child.to}
                            onClick={handleMenuClick}
                            sx={{
                              justifyContent: "flex-start",
                              width: "100%",
                              textTransform: "none",
                              px: 0,
                              color: "text.primary",
                              "&:hover": { bgcolor: "action.hover" },
                            }}
                          >
                            {child.content}
                          </Button>
                        ))}
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Button
                    key={index}
                    component={Link}
                    to={page.to}
                    sx={{ my: 2, color: "white" }}
                  >
                    {page.content}
                  </Button>
                )
              )}
            </Box>

            {/* User menu */}
            <Box sx={{ flexGrow: 0 }}>
              {!isLoggedIn ? (
                <>
                  <Button color="inherit" component={Link} to="/dang-nhap">
                    Đăng nhập
                  </Button>
                  <Button color="inherit" component={Link} to="/dang-ky">
                    Đăng ký
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip title="Mở cài đặt">
                    <Button
                      onClick={handleOpenUserMenu}
                      sx={{
                        color: "inherit",
                        textTransform: "none",
                        minWidth: "auto",
                        p: 1,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                      }}
                    >
                      <Avatar
                        alt={user?.fullName}
                        src={user?.avatarUrl}
                        sx={{ width: 32, height: 32 }}
                      >
                        {userInitials}
                      </Avatar>

                      <Typography
                        sx={{
                          display: { xs: "none", md: "block" },
                          fontWeight: 500,
                          color: "inherit",
                        }}
                      >
                        Hi! {user.fullName}
                      </Typography>
                    </Button>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    {settings.map((item) => (
                      <MenuItem
                        key={item.id}
                        component={item.to ? Link : "div"}
                        to={item.to || undefined}
                        onClick={(e) => {
                          if (item.action === "logout") {
                            e.preventDefault();
                            setOpenLogoutModal(true);
                          } else {
                            handleCloseUserMenu();
                          }
                        }}
                        sx={{
                          py: 1.2,
                          px: 2,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateX(4px)",
                            backgroundColor: "rgba(25,118,210,0.08)",
                          },
                          "&:active": {
                            backgroundColor: "rgba(25,118,210,0.12)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          {item.icon && (
                            <Box
                              sx={{
                                mr: 2,
                                color: "text.secondary",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {item.icon}
                            </Box>
                          )}

                          <Typography
                            sx={{ flexGrow: 1, fontSize: "0.875rem" }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Logout Modal */}
      <Modal
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        title="Xác nhận Đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?"
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Header;
