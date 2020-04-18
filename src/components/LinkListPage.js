import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

function LinkListPage() {
  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color="primary"
      startIcon={<Add />}
      component={RouterLink}
      to="/new"
    >
      Submit a Link
    </Button>
  );
}

export default LinkListPage;
