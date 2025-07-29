import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Box,
  Avatar,
  Tooltip
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSupport = () => {
    handleMenuClose();
    navigate('/support');
  };

  const handleLogout = () => {
    localStorage.clear();
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" gap={2}>
          <Button color="inherit" component={NavLink} to="/book">
            Book Delivery
          </Button>
          <Button color="inherit" component={NavLink} to="/my-bookings">
            My Bookings
          </Button>
        </Box>

        <Box>
          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen} size="large" color="inherit">
              <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleSupport}>Support</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;
