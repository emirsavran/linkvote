import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  TextField, Button, makeStyles, Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(3, 0),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(3),
    },
  },
}));

function LinkSubmitPage() {
  const classes = useStyles();

  return (
    <>
      <Button size="large" color="primary" startIcon={<ArrowBack />} component={RouterLink} to="/">
        Return to the List
      </Button>
      <Typography variant="h6" component="h2" className={classes.title}>Add New Link</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField id="name" label="Link Name" placeholder="e.g. Alphabet" fullWidth />
        <TextField id="url" label="Link URL" placeholder="e.g. http://abc.xyz" fullWidth />
        <Button variant="contained" color="primary" size="large">Add</Button>
      </form>
    </>
  );
}

export default LinkSubmitPage;
