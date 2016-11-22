import React, { Component } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Alert } from 'react-bootstrap';

import selectUser from '../actions/select_user';
import selectCity from '../actions/select_city';
import updateListings from '../actions/update_listings';

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordflag: false

    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value,passwordflag: false});
  }

  signIn() {
    request.post('/api/signin', this.state)
    .then((res) => {
      window.localStorage.setItem('canopy', res.data.token);
      console.log('USER ', res.data.user)
      this.props.selectUser(res.data.user);
      if (!this.props.activeCity) {
        request.get('/api/cities/San Francisco, CA')
        .then((city) => {
          console.log('city got it');
          this.props.selectCity(city.data);
          return request.get(`/api/listings/${city.data.id}`);
        })
        .then((listings) => {
          this.props.updateListings(listings.data);
          browserHistory.push('/content/listings');
        })
        .catch((err) => {
          console.log('Error submitting city or getting listings: ', err);
        });
      } else {
        browserHistory.push('/content/listings');
      }
    })
    .catch((err) => {
      console.log('Error signing in: ', err);
      this.setState({ passwordflag: true, password: '' });
      browserHistory.push('/content/signin');
    });
  }

  render() {
    return (
      <div className="signIn">
        <h3>Sign In</h3>
        <form onSubmit={this.signIn} action="javascript:void(0)">
          <p>Email:
            <input type="text" onChange={this.onEmailChange} value={this.state.email} />
          </p>
          <p>Password:
            <input type="password" onChange={this.onPasswordChange} value={this.state.password} />
          </p>
          <input type="submit" />
        </form>
        {this.state.passwordflag &&
          <Alert bsStyle="warning">
             your username or password is wrong bruh.
          </Alert>
        }
      </div>
    );
  }
}

function mapStateToProps({ activeCity }) {
  return {
    activeCity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser, selectCity, updateListings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);