import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardActions, CardContent, Typography, makeStyles, Box, Paper,
} from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
  },
  pointBox: {
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
}));

function ListItem({ name, url }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Paper elevation={0} variant="outlined" className={classes.pointBox}>
        <Typography variant="h3">6</Typography>
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
          <Button color="primary" startIcon={<ArrowUpward />}>
            Up Vote
          </Button>
          <Button color="primary" startIcon={<ArrowDownward />}>
            Down Vote
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ListItem;
