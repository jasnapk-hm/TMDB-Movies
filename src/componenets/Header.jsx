import React, { useEffect, } from "react";
import { useDispatch, } from 'react-redux';
import { fetchGenres, removeUser } from '../store/action'
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, Chip } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, } from 'react-router-dom';
const Header = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const nav = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = () => {
    localStorage.removeItem('User_ID');
    dispatch(removeUser());
    nav('/')
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchGenres())
  }, [dispatch]);

  return (

    <>
      <AppBar style={{ backgroundColor: "rgb(1, 1, 78)" }} position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, cursor: 'pointer', fontWeight: 600 }} onClick={() => nav('/home')} >
            TMDB Movies
          </Typography>
          <Button color="inherit" style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => nav('/favourites')}>My Favourites</Button>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>);

}
export default Header;