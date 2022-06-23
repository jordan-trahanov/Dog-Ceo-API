import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const boxStyles = {
  width: '90%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '10% 5%',
};
const backgroundColor = 'rgb(25 118 210 / 15%)';

const Loading = () => (
  <Box sx={boxStyles}>
    <Skeleton sx={{ backgroundColor }} />
    <Skeleton sx={{ backgroundColor }} animation="wave" />
    <Skeleton sx={{ backgroundColor }} />
  </Box>
);
export default Loading;
