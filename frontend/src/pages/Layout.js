import { Outlet, Link } from "react-router-dom";
import * as React from 'react';
import Typography from '@mui/material/Typography';



import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const Layout = () => {
  return (
    <>


<div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography variant="subtitle1" color="text.primary">CricInfo</Typography>
      <Link underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit" to="/">
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
      </Link>
      <Link underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit" to="/matches"> 
          <SportsCricketIcon sx={{ mr: 0.5 }} fontSize="inherit" />Matches</Link>
      </Breadcrumbs>

      </div>

      <Outlet />
    </>
  )
};

export default Layout;


