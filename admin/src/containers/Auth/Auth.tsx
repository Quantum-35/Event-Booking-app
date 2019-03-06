import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import './Auth.css';
import { signup, signin } from './actions';

export interface iProp {
  signupUser: (body: any) => void;
  signInUser: (body: any) => void;
  userData: any;
  history: any
}
export  class Auth extends React.Component<iProp, {}> {

  state = {
    username: '',
    email: '',
    password: '',
    isLogin: false
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {name, value}: any = e.target;
    this.setState({
      [name]: value,
    });
  };

  submitHandler = async (e) => {
    const {isLogin} = this.state;
    const {username, email, password} = this.state;
    e.preventDefault();
    if (isLogin) {
      const {signInUser} = this.props;
      const {history } = this.props;
      const data = {
        email,
        password,
        history
      }
      try {
         await signInUser(data);
      } catch (error) {
        //console.log(error);
      }
      return;
    }
    const { signupUser } = this.props;
    if(password.trim().length<6) {
      console.log('Enter a strong password');
      return;
    }
    const data = {
      username,
      email,
      password
    }
    try {
      await signupUser(data);
      this.setState({isLogin: true});
      return;
    } catch (error) {
      //console.log(error);
    }
  }
  
  handleSignIn = () => {
    this.setState({isLogin: !this.state.isLogin});
  }
  

  // saveDataToLocalStorage = (key, value) => {
  //   return localStorage.setItem(key, value);
  // }
  
  render() {
    const {isLogin} = this.state;
    const { data } = this.props.userData.authReducer.payload;
    if (data) {
      if(data.login){
      // this.saveDataToLocalStorage('userDD', JSON.stringify(data.login));
      // this.saveDataToLocalStorage('access_token', JSON.stringify(data.login.token));
    }
  }
    return (
      <form onSubmit={this.submitHandler} className="auth-form">
          { isLogin ? null :
            <div className="form-control">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" required onChange={this.handleChange}/>
            </div>
          }
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id="email"required onChange={this.handleChange}/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id="password" required onChange={this.handleChange}/>
        </div>
        <div className="form-actions">
          <button type="submit" className='btn-submit'> {isLogin ? 'Login' :'Signup'} </button>
          <button type='button' onClick={this.handleSignIn} > {isLogin?'Siwtch to Signup': 'Switch to Signin'}</button>
        </div>
      </form>
    )
  }
}

export const mapStateToProps = state => ({
  userData: state
});
export const mapDispatchToProps = dispatch => bindActionCreators({
  signupUser: signup,
  signInUser: signin
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
