import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Auth.css';
import { signup, signin } from './actions';

interface iProp {
  signupUser: (body: any) => void;
  signInUser: (body: any) => void;
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

  submitHandler = (e) => {
    const {isLogin} = this.state;
    const {username, email, password} = this.state;
    e.preventDefault();
    if (isLogin) {
      const {signInUser} = this.props;
      console.log(email)
      const data = {
        email,
        password
      }
      try {
        signInUser(data);
      } catch (error) {
        console.log(error);
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
      signupUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  handleSignIn = () => {
    this.setState({isLogin: true});
  }

  handleSignup = () => {
    this.setState({isLogin: false});
  }

  render() {
    const {isLogin} = this.state;
    return (
      <form onSubmit={this.submitHandler} className="auth-form">
          { isLogin ? null :
            (
            <div className="form-control">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" required onChange={this.handleChange}/>
            </div>
            )
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
          <button type={isLogin ? "button": "submit"}  onClick={this.handleSignup}> Signup </button>
          <button type={isLogin ? 'submit': 'button'} onClick={this.handleSignIn} >Signin</button>
        </div>
      </form>
    )
  }
}

// const mapStateToProps = state => ({
  
// });
const mapDispatchToProps = dispatch => bindActionCreators({
  signupUser: signup,
  signInUser: signin
}, dispatch);

export default connect(null, mapDispatchToProps)(Auth);
