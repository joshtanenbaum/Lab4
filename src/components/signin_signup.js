import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinUser, signupUser } from '../actions';

class SignInSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }


  onInputChange = (b, event) => {
    if (b === 'email') {
      this.setState({ email: event.target.value });
    } else if (b === 'password') {
      this.setState({ password: event.target.value });
    } else if (b === 'username') {
      this.setState({ username: event.target.value });
    }
  }


  render() {
    return (
      <div id="signin_signup">
        <input type="text" onChange={(event) => { this.onInputChange('email', event); }} value={this.state.email} placeholder="Enter Email" />
        <input type="text" onChange={(event) => { this.onInputChange('password', event); }} value={this.state.password} placeholder="Enter Password" />
        <input type="text" onChange={(event) => { this.onInputChange('username', event); }} value={this.state.username} placeholder="Enter Username if Creating Account" />
        <button type="submit" onClick={() => { this.props.signinUser({ email: this.state.email, password: this.state.password }); }}>Sign In</button>
        <button type="submit" onClick={() => { this.props.signupUser({ email: this.state.email, password: this.state.password, username: this.state.username }); }}>Create Account</button>
      </div>
    );
  }
}


export default withRouter(connect(null, { signinUser, signupUser })(SignInSignUp));
