import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import AdbIcon from '@mui/icons-material/Adb';
import Alert from '@mui/material/Alert';
import { registerUser } from '../api';  // Import the registerUser function from your api
import QRCode from 'react-qr-code';


// const QRCode = require('qrcode.react').default;

const pages = ['Register'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);  // For controlling the alert message
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [hrid, setHrid] = React.useState('');
  const [openQRModal, setOpenQRModal] = React.useState(false);  // Manage QR code modal state


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Modal functions
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // setHrid(''); // Clear the input field
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(hrid);  // Send HRID to Django backend using Axios
      console.log('TSX:', response);
      console.log('result:', response.success);
      if (response.success){
        handleCloseModal();  // Close registration modal
        setOpenQRModal(true);  // Open QR code modal
      }else{
        setAlertMessage(response.message);  // Set alert message if already registered
      
        // Clear alert message after 2 seconds
        setTimeout(() => {
          setAlertMessage(null);
        }, 2000);      
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleCloseQRModal = () => {
    setOpenQRModal(false);
    window.location.reload(); 
  };

  return (
    <AppBar position="static" sx={{ 
      backgroundColor: 'white', 
      color: 'black', 
      borderBottom: '2px solid transparent',
      backgroundClip: 'padding-box, border-box',
      borderImage: 'linear-gradient(to right, #4285F4, #DB4437, #F4B400, #0F9D58) 1'
    }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <img src="/src/assets/Vxi-logo.png" alt="VXI Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VXI QR CODE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleOpenModal}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleOpenModal} // Open modal on click
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      
      {/* Modal for Registration */}
      <Dialog open={openModal} onClose={handleCloseModal} sx={{m:1}}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="HRID"
            type="text"
            fullWidth
            variant="outlined"
            value={hrid}
            onChange={(e) => setHrid(e.target.value)} // Set HRID value
          />
        </DialogContent>
        {/* Conditionally render the alert if alertMessage exists */}
      {alertMessage && (
        <Alert severity="error" onClose={() => setAlertMessage(null)} sx={{ m: 0 }}>
          {alertMessage}
        </Alert>
      )}
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
          <Button onClick={handleRegister} color="primary">Register</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openQRModal} onClose={handleCloseQRModal}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          {hrid ? <QRCode value={hrid} /> : <Typography>No HRID available</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQRModal}>Close</Button>
        </DialogActions>
      </Dialog>

    </AppBar>
  );
}

export default ResponsiveAppBar;
