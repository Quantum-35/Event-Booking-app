import React from 'react';
import { NavLink } from 'react-router-dom';

import "./MainNavigation.css";

export default  () => {
  return (
    <header className='main-navigation'>
        <div className='main-navigation__logo'>
            <h1>EasyBook</h1> 
        </div>
        <nav className='main-navigation__items'>
            <ul>
                <li><NavLink exact to='/'>Home </NavLink></li>
                <li><NavLink to='/events'>Events </NavLink></li>
                <li><NavLink to='/bookings'>Book Event </NavLink></li>
                <li><NavLink to='/auth'>Signup </NavLink></li>
            </ul>
        </nav>
    </header>
  )
}
