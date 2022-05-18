import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import ListIcon from '@mui/icons-material/List';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Links as LinkType } from '../types/types';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: 'primary.main',
    fontSize: '40px',
  },
  active: {
    textDecoration: 'underline',
    color: 'black',
    fontSize: '40px',
  },
}));

const drawerWidth = 240;

const LINKS = [{
  label: 'Contacts',
  path: '/contacts',
},
{
  label: 'Create Contacts',
  path: '/contacts/create',
}];

type Props = {
  children: any
};

export default function Layout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {LINKS.map((row: LinkType, index) => (
          <ListItem key={row.label} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <ListIcon /> : <ImportContactsIcon />}
              </ListItemIcon>
              <NavLink
                to={row.path}
                className={(navData) => (navData.isActive ? classes.active : classes.link)}
              >
                <ListItemText primary={row.label} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          marginTop: 8, flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
