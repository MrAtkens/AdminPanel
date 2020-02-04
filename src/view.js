import React from 'react';
import clsx from 'clsx';
import { Route, Switch, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import routes from './routes'
import './mainCss.css'

const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
        <Redirect from="/" to="/main" />
    </Switch>
  );

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

function MainView() {
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
          {switchRoutes}
      </main>
    </div>
  );
}

export default MainView