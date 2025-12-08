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
  { label: "Profile", to: "/profile" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Account", to: "/account" },
  { label: "Đăng xuất", action: "logout" },
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
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
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
                      color="inherit"
                      sx={{
                        my: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
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
                              "&:hover": {
                                bgcolor: "action.hover",
                              },
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
                    {/* THAY THẾ IconButton BẰNG Button MUI */}
                    <Button
                      onClick={handleOpenUserMenu}
                      sx={{
                        // Đảm bảo nút không có nền và sử dụng màu của Header
                        color: "inherit",
                        textTransform: "none", // Bỏ chữ viết hoa
                        minWidth: "auto", // Đảm bảo nút không quá rộng
                        p: 1, // Padding nhẹ quanh Avatar + Tên
                        borderRadius: 2,

                        // Căn chỉnh nội dung (Avatar và Typography)
                        display: "flex",
                        alignItems: "center",
                        gap: 1,

                        // Hiệu ứng hover chuẩn
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.15)",
                        },
                      }}
                    >
                      <Avatar
                        alt={user?.fullName || "User"}
                        src={user?.avatarUrl}
                        sx={{ width: 32, height: 32 }} // Đảm bảo Avatar có kích thước chuẩn
                      >
                        {userInitials}
                      </Avatar>

                      {/* Typography chứa tên người dùng */}
                      <Typography
                        component="span"
                        sx={{
                          display: { xs: "none", md: "block" }, // Ẩn tên trên mobile
                          fontWeight: 500,
                          color: "inherit",
                          lineHeight: 1, // Đảm bảo căn chỉnh vertical tốt hơn
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
                        key={item.label}
                        component={item.to ? Link : "div"}
                        to={item.to || undefined}
                        onClick={() => item.action === "logout" && setOpenLogoutModal(true)}
                      >
                        <Typography textAlign="center" sx={{ width: "100%" }}>
                          {item.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Modal xác nhận Logout */}
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
