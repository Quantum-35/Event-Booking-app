import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Store from './stores/store';
import AuthComponent  from './containers/Auth/Auth';
import HomePage from './containers/Home/HomePage';
import Events from './containers/Events/Events';
import Booking from './containers/Booking/Booking';
import MainNavigation from './components/Navigation/MainNavigation';
import PrivateRoute from './utils/PrivateRoute';

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <React.Fragment>
            <MainNavigation />
            <main className='main-content'>
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/auth" component={AuthComponent}/>
                <PrivateRoute path="/events" component={Events}/>
                <PrivateRoute path="/bookings" component={Booking}/>
              </Switch>
            </main>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
