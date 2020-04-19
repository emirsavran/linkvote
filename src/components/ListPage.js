import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button, Divider, FormControl, InputLabel, Select, MenuItem, makeStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { useLinkContext } from '../LinkContext';

import List from './List';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
  },
  formControl: {
    minWidth: 150,
  },
}));

function ListPage() {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState(0);
  const linkContext = useLinkContext();

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <>
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
      <Divider className={classes.divider} />
      <FormControl className={classes.formControl}>
        <InputLabel id="order-by-select-label">Order By</InputLabel>
        <Select
          labelId="order-by-select-label"
          id="order-by-select"
          fullWidth
          value={orderBy}
          onChange={handleOrderChange}
        >
          <MenuItem value={0}>Latest</MenuItem>
          <MenuItem value={1}>Most Voted (10 &#8594; 1)</MenuItem>
          <MenuItem value={2}>Less Voted (1 &#8594; 10)</MenuItem>
        </Select>
      </FormControl>
      <List data={linkContext.links} />
    </>
  );
}

export default ListPage;
