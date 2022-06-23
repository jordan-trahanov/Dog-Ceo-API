import React from 'react';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

const ApplicationBar = ({ breed, subBreed }: { breed: string; subBreed: string }) => (
  <AppBar component="nav">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link component={Button} variant="h6" href={'/'} sx={{ color: '#fff' }}>
          DOGS
        </Link>
      </Typography>
      <Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {breed && breed.toUpperCase()}
          {subBreed && ` / ${subBreed.toUpperCase()}`}
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

export default ApplicationBar;
