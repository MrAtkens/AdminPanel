import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MainPage } from '../../containers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function MainGrid() {
  const classes = useStyles();
  const [open] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
          
        <div className={classes.drawerHeader} />
          <MainPage/>
      </main>
    </div>
  );
}

export default MainGrid