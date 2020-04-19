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

function List({ data }) {
  const classes = useStyles();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageItems, setCurrentPageItems] = useState(data.slice(0, PAGE_SIZE));

  useEffect(() => {
    setPageCount(Math.ceil(data.length / PAGE_SIZE));
  }, [data]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    setCurrentPageItems(data.slice((value - 1) * PAGE_SIZE, value * PAGE_SIZE));
  };

  if (data.length === 0) {
    return (
      <Typography>There is no link right now. Please submit one.</Typography>
    );
  }

  return (
    <Box className={classes.container}>
      {currentPageItems.map(({ name, url }) => (
        <ListItem name={name} url={url} key={name} />
      ))}
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </Box>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

export default List;
