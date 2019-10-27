import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { NavigationAppBar } from './components'
import { AccesGrid } from './containers'
import { adminAccept } from './actions'

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

class Main extends Component{
    componentWillMount(){
      this.props.adminAccept()
    }
    render(){
        return(
          <div>
            {this.props.redirectStatus === true ? (<div>
              <NavigationAppBar mails={this.props.mails}/>
                <div>{switchRoutes}</div>   
            </div>) : (<AccesGrid/>)}                    
          </div>
        );
    }
}

const mapStateToProps = store => {
  return {
    redirectStatus: store.usersReducer.redirectStatus,
    mails: store.mailsRedurcer.mails
  }
}

const mapDispatchToProps = {
  adminAccept
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Main)