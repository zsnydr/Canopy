import React, { Component } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import selectUser from '../../actions/select_user';

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      userType: 0
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUserTypeChange = this.onUserTypeChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onUsernameChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onUserTypeChange(event) {
    this.setState({ userType: event.target.value });
  }

  signUp() {
    request.post('/api/signup', /*{ state:*/ this.state/*, token: window.localStorage.getItem('canopy') }*/)
    .then((res) => {
      window.localStorage.setItem('canopy', res.data.token);
      console.log('RES SIGNUP ', res.data.user)
      this.props.selectUser(res.data.user);
      browserHistory.push(`/content/profile/${res.data.user.id}`);
    })
    .catch((err) => {
      console.log('Error signing up: ', err);
      browserHistory.push('/signup');
    });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.signUp} action="javascript:void(0)">
          <input type="text" onChange={this.onNameChange} value={this.state.name}>Name</input>
          <input type="text" onChange={this.onUsernameChange} value={this.state.email}>Email</input>
          <input type="text" onChange={this.onPasswordChange} value={this.state.password}>Password</input>
          <input type="text" onChange={this.onUserTypeChange} value={this.state.userType}>User Type</input>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUpPage);
