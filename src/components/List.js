import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles, Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

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

  if (order.length === 0) {
    return (
      <Typography>There is no link right now. Please submit one.</Typography>
    );
  }

  return (
    <Box className={classes.container}>
      {currentPageItems.map((id) => (data[id] ? (
        <ListItem key={id} id={id} name={data[id].name} url={data[id].url} />
      ) : null))}
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
        />
      )}
    </Box>
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
