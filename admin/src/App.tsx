import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import AuthComponent  from './containers/Auth/Auth';
import HomePage from './containers/HomePage';
import Events from './containers/Events';
import Booking from './containers/Booking';
import MainNavigation from './components/Navigation/MainNavigation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation />
          <main className='main-content'>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/auth" component={AuthComponent}/>
              <Route path="/events" component={Events}/>
              <Route path="/bookings" component={Booking}/>
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
