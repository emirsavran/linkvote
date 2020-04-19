import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardActions, CardContent, Typography, makeStyles, Box, Paper, IconButton,
} from '@material-ui/core';
import { ArrowUpward, ArrowDownward, RemoveCircleOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: 'transparent',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    '&:hover': {
      backgroundColor: '#ffffff',
      transition: 'background-color 200ms linear',
    },
    '&:hover $removeButton': {
      opacity: 1,
      transition: 'opacity 200ms linear',
    },
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
  },
  pointBox: {
    backgroundColor: 'transparent',
    margin: theme.spacing(2),
    padding: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'row',
      marginBottom: 0,
      justifyContent: 'flex-start',
      '& > *:first-child': {
        marginRight: theme.spacing(2),
      },
    },
  },
  removeButton: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

function ListItem({
  id, name, url, vote, onRemoveClick, onUpvoteClick, onDownvoteClick,
}) {
  const classes = useStyles();

  const handleRemoveClick = () => {
    onRemoveClick(id, name);
  };

  const handleUpvoteClick = () => {
    onUpvoteClick(id);
  };

  const handleDownvoteClick = () => {
    onDownvoteClick(id);
  };

  return (
    <>
      <Card className={classes.card} elevation={0} variant="outlined">
        <IconButton
          className={classes.removeButton}
          aria-label="remove link"
          onClick={handleRemoveClick}
        >
          <RemoveCircleOutline color="error" />
        </IconButton>
        <Paper elevation={0} variant="outlined" className={classes.pointBox}>
          <Typography variant="h3">{vote}</Typography>
          <Typography>Points</Typography>
        </Paper>
        <Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h3">
              {`(${url})`}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button color="primary" startIcon={<ArrowUpward />} onClick={handleUpvoteClick}>
              Up Vote
            </Button>
            <Button color="primary" startIcon={<ArrowDownward />} onClick={handleDownvoteClick}>
              Down Vote
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  vote: PropTypes.number.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onUpvoteClick: PropTypes.func.isRequired,
  onDownvoteClick: PropTypes.func.isRequired,
};

export default ListItem;
