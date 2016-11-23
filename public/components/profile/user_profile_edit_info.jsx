import React, { Component } from 'react';
import request from 'axios';
import { browserHistory } from 'react-router';
import { Alert } from 'react-bootstrap';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      homeBase: '',
      userType: 0,
      showAlert: false
    };
    console.log(this.state);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUserTypeChange = this.onUserTypeChange.bind(this);
    this.onHomeBaseChange = this.onHomeBaseChange.bind(this);
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onUserTypeChange(event) {
    this.setState({ userType: event.target.value });
  }

  onHomeBaseChange(event) {
    this.setState({ homeBase: event.target.value });
  }
  
  componentDidMount() {
    this.setState(this.props.activeUser);
  }

  render() {
    return (
      <div>
        <form onSubmit={() => { this.props.submitChange(this.state) }} action="javascript:void(0)">
          <p>
            Name:
            <input type="text" onChange={this.onNameChange} value={this.state.name} required />
          </p>
          <p>
           Password:
            <input type="password" onChange={this.onPasswordChange} value={this.state.password} pattern=".{0}|.{6,}" placeholder="(6 char min)" required />
          </p>
          <p>
            User Type:
            <input type="text" onChange={this.onUserTypeChange} value={this.state.userType} required />
          </p>
          <p>
            Home City:
            <input type="text" onChange={this.onHomeBaseChange} value={this.state.homeBase} required />
          </p>
          <input type="submit" />
        </form>
        {this.state.showAlert &&
          <Alert bsStyle="warning">
             User already exists with that email address.
          </Alert>
        }
      </div>
    );
  }
}

export default ProfileEdit;
