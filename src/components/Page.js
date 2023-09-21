import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AOS from 'aos';
import theme from '../theme/index';

export default function Page({ children }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    AOS.init({
      once: false,
      mirror: true,
      delay: 50,
      duration: 1400,
      offset: 0,
      easing: 'ease-in-out'
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  });

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <div className="body">{children}</div>
    </ThemeProvider>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired
};
