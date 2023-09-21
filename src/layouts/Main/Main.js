import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { TopBar } from './components/navigation/topBar';

const Main = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: 'rgba(0,0,0,.55);', minHeight: '100vh' }} paddingTop={15}>
      <TopBar />
      <main>{children}</main>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string
};

export default Main;
