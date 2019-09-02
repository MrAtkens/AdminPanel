import React, { Component } from 'react';
import { Route, Router, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';
 
import Main from './main'

const hist = createBrowserHistory();


class App extends Component {

  render(){
   return (
    <BrowserRouter> 
     <Router history={hist}>
       <Switch>
         <Route path="/" component={Main} />
         <Redirect from="/" to="/main" />
       </Switch>
     </Router>
    </BrowserRouter>
   );
  }
 }
 
 export default App;
