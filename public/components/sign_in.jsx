import React, { Component } from 'react';
import request from 'axios';
// import browserHistory from 'react-router';

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  signIn(event) {
    request.post('/api/signin', this.state)
    .then((res) => {
      console.log('SIGNIN RES: ', res);
      window.localStorage.setItem('canopy', res.data.token);
      // browserHistory.push('/content/profile');
    })
    .catch((err) => {
      console.log('Error signing in: ', err);
    });
  }

  render() {
    return (
      <div>
        <h3>Sign In</h3>
        <form onSubmit={this.signIn} action="javascript:void(0)">
          <input type="text" onChange={this.onUsernameChange} value={this.state.username}>Username</input>
          <input type="text" onChange={this.onPasswordChange} value={this.state.password}>Password</input>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default SignInPage;
