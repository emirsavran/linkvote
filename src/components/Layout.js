import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Box, Container, CssBaseline, Toolbar, Typography,
} from '@material-ui/core';

function Layout({ children }) {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">
            LinkVOTE Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm">
        <Box py={3}>
          {children}
        </Box>
      </Container>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
