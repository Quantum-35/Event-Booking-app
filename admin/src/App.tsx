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

class App extends Component {
  render() {
    console.log(process.env)
    return (
      <Provider store={Store}>
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
      </Provider>
    );
  }
}

export default App;
