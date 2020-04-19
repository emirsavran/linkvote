import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, makeStyles, Box, Button, Dialog, DialogTitle, DialogActions, Snackbar,
} from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';

import { useLinkContext, removeLink } from '../LinkContext';

import ListItem from './ListItem';

const PAGE_SIZE = 5;

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function List({ data, order }) {
  const classes = useStyles();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageItems, setCurrentPageItems] = useState(order.slice(0, PAGE_SIZE));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [toBeRemovedLink, setToBeRemovedLink] = useState({ id: '', name: '' });
  const { dispatch } = useLinkContext();

  useEffect(() => {
    setPageCount(Math.ceil(Object.keys(data).length / PAGE_SIZE));
  }, [data]);

  useEffect(() => {
    const newCurrentPageItems = order.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    setCurrentPageItems(newCurrentPageItems);

    if (newCurrentPageItems.length < 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, order]);

  const handleRemoveClick = (id, name) => {
    setToBeRemovedLink({ id, name });
    setIsDialogOpen(true);
  };

  const handleRemoveConfirm = () => {
    setIsDialogOpen(false);
    dispatch(removeLink(toBeRemovedLink.id));
    setIsSnackbarOpen(true);
  };

  if (order.length === 0) {
    return (
      <Typography>There is no link right now. Please submit one.</Typography>
    );
  }

  return (
    <>
      <Box className={classes.container}>
        {currentPageItems.map((id) => (data[id] ? (
          <ListItem
            key={id}
            onRemoveClick={handleRemoveClick}
            id={id}
            name={data[id].name}
            url={data[id].url}
          />
        ) : null))}
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
          />
        )}
      </Box>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-remove"
      >
        <DialogTitle id="alert-remove">
          {`Do you want to remove ${toBeRemovedLink.name}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveConfirm} color="secondary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
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
          {`${toBeRemovedLink.name} removed.`}
        </Alert>
      </Snackbar>
    </>
  );
}

List.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  order: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default List;
