import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { NavigationAppBar } from './components'

import routes from './routes'


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

class Main extends Component{

    render(){
        return(
          <div>
            <NavigationAppBar />
                <div>{switchRoutes}</div>         
          </div>
        );
    }
}

export default Main