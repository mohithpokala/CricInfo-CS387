import { Outlet, Link } from "react-router-dom";
import * as React from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import HomeIcon from '@mui/icons-material/Home';




const Layout = () => {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/matches">Matches</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}


<List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          CricInfo
        </ListSubheader>
      }
    >
      <Link to="/"><ListItemButton> 
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton></Link>
      <Link to="/matches"> <ListItemButton>
        <ListItemIcon>
          <SportsCricketIcon />
        </ListItemIcon>
        <ListItemText primary="Matches" />
      </ListItemButton></Link>
    </List>
      




      <Outlet />
    </>
  )
};

export default Layout;


