import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function ButtonAppBar({ user, signOut }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EdNotes
          </Typography>
          <Link to="/">
              <Button color="inherit">Notes</Button>
          </Link>
        
          { user ? (
              <Button color="inherit" onClick={signOut}>Sign out</Button>
              )
              :
              <Link to="/signin">
                  <Button color="inherit">Sign in</Button>
              </Link>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
