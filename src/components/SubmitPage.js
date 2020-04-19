import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  TextField, Button, makeStyles, Typography, Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ArrowBack } from '@material-ui/icons';

import { useLinkContext, addLink } from '../LinkContext';

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

function SubmitPage() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [url, setUrl] = useState('');
  const [hasUrlError, setHasUrlError] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { dispatch } = useLinkContext();

  const handleFormSubmit = () => {
    if (!name.trim()) {
      setHasNameError(true);
    }
    if (!url.trim()) {
      setHasUrlError(true);
    }
    if (name.trim() && url.trim()) {
      dispatch(addLink(name, url));
      setHasNameError(false);
      setHasUrlError(false);
      setIsSnackbarOpen(true);
    }
  };

  return (
    <>
      <Button size="large" color="primary" startIcon={<ArrowBack />} component={RouterLink} to="/">
        Return to the List
      </Button>
      <Typography variant="h6" component="h2" className={classes.title}>Add New Link</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Link Name"
          placeholder="e.g. Alphabet"
          helperText="Write at least one character."
          fullWidth
          value={name}
          error={hasNameError}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="url"
          label="Link URL"
          placeholder="e.g. http://abc.xyz"
          helperText="Write at least one character."
          fullWidth
          value={url}
          error={hasUrlError}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleFormSubmit}
        >
          Add
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert onClose={() => setIsSnackbarOpen(false)} severity="success">
          {`${name} added.`}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SubmitPage;
