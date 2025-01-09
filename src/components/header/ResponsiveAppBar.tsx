import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useAuth } from "hooks/useAuth";
import ChangePasswordModal from "./changePasswordModal";

const pages = ["    "];
const settings = [
  { label: "Password Reset", icon: <LockIcon /> },
  { label: "Logout", icon: <ExitToAppIcon /> },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false); // State for the logout confirmation dialog
  const [openChangePasswordModal, setOpenChangePasswordModal] = React.useState(false); // State for the Change Password Modal

  const { userData, logout } = useAuth();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Open the logout confirmation dialog
  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  // Handle user confirmation on logout
  const handleConfirmLogout = () => {
    logout(); // Add your logout logic here
    setOpenDialog(false); // Close the dialog
  };

  const handleCancelLogout = () => {
    setOpenDialog(false); // Close the dialog if the user cancels
  };

  // Handle opening and closing the change password modal
  const handleOpenChangePassword = () => {
    setOpenChangePasswordModal(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePasswordModal(false);
  };



  // Get the first letter of the user's name (assuming userData contains the user's name)
  const userInitial = userData?.name ? userData.name.charAt(0).toUpperCase() : '';

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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

          {/* Other content or pages can go here */}

          <Box sx={{ flexGrow: 1 }} /> {/* Ensures space between left side and avatar */}

          {/* User Profile Menu */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* Avatar displaying the first letter of the user's name */}
                <Avatar>{userInitial}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ label, icon }) => (
                <MenuItem
                  key={label}
                  onClick={label === "Logout" ? handleLogoutClick : label === "Password Reset" ? handleOpenChangePassword : handleCloseUserMenu}
                  sx={{ color: label === "Logout" ? "red" : "inherit" }} // Apply red color for Logout
                >
                  {icon} {/* Render the icon */}
                  <Typography sx={{ textAlign: "center", ml: 1 }}>
                    {label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Confirmation Dialog for Logout */}
      <Dialog open={openDialog} onClose={handleCancelLogout}>
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={openChangePasswordModal}
        onClose={handleCloseChangePassword}
      />
    </AppBar>
  );
}

export default ResponsiveAppBar;
