import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const Container = ({ children, ...rest }) => (
  <Box maxWidth={{ xs: 400, sm: 600, md: 1000 }} margin={'0 auto'} paddingBottom={10} paddingX={3} {...rest}>
    {children}
  </Box>
);

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
