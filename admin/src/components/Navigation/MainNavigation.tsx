import React from 'react';
import { NavLink } from 'react-router-dom';

import "./MainNavigation.css";

interface iProps {
  // history: any;
}
export  class MainNavigation extends React.Component<iProps> {
  handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  }
  render(){
    const token = localStorage.getItem('access_token');
    return (
      <header className='main-navigation'>
          <div className='main-navigation__logo'>
              <h1>EasyBook</h1> 
          </div>
          <nav className='main-navigation__items'>
              <ul>
                  <li><NavLink exact to='/'>Home </NavLink></li>
                  {token?
                    (<React.Fragment>
                      <li><NavLink to='/events'>Events </NavLink></li>
                      <li><NavLink to='/bookings'>Book Event </NavLink></li>
                    </React.Fragment>
                  ): null
                  }
                  {
                    token?
                      <li><button type='button' className="logout-btn" onClick={this.handleLogout}>Logout </button></li>
                    : 
                    <li><NavLink to='/auth'>Signup / Signin </NavLink></li>
                  }
              </ul>
          </nav>
      </header>
    )
  }
}

export default MainNavigation;