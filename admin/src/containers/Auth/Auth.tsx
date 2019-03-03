import React from 'react'

import './Auth.css';

interface iProp {
}


export default class Auth extends React.Component<iProp, {}> {

  state = {
    username: '',
    email: '',
    password: ''
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {name, value}: any = e.target;
    this.setState({
      [name]: value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const {username, email, password} = this.state;
    if(password.trim().length<6) {
      console.log('Enter a strong password');
      return;
    }
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} className="auth-form">
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" required onChange={this.handleChange}/>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id="email"required onChange={this.handleChange}/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id="password" required onChange={this.handleChange}/>
        </div>
        <div className="form-actions">
          <button type="submit" >Signup </button>
          <button type="button" >Signin</button>
        </div>
      </form>
    )
  }
}
