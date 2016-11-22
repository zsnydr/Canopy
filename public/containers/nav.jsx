import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import selectUser from '../actions/select_user';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };

    this.goToExplore = this.goToExplore.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  goHome() {
    browserHistory.push('/');
  }

  goToExplore() {
    browserHistory.push('/content/listings');
  }

  goToProfile() {
    browserHistory.push('/content/profile/1');
  }

  logOut() {
    this.props.selectUser([]);
    window.localStorage.removeItem('canopy');
    browserHistory.push('/');
  }

  goToSignUp() {
    browserHistory.push('/content/signup');
  }

  goToSignIn() {
    browserHistory.push('/content/signin');
  }

  render() {
    return (
      <div className="navBar">
        <Navbar collapseOnSelect>
          <Navbar.Header className="Canopy">
            <Navbar.Brand>
              <a onClick={this.goHome}>canopy</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="links" pullRight>
              {!!Object.keys(this.props.activeUser).length && <NavItem eventKey={0} onClick={this.goToProfile}>Profile</NavItem>}
              {!Object.keys(this.props.activeUser).length && <NavItem eventKey={1} onClick={this.goToSignIn}>SignIn</NavItem>}
              {!Object.keys(this.props.activeUser).length && <NavItem eventKey={2} onClick={this.goToSignUp}>SignUp</NavItem>}
              {!!this.props.activeCity && <NavItem eventKey={3} onClick={this.goToExplore}>Explore</NavItem>}
              {!!Object.keys(this.props.activeUser).length && <NavItem eventKey={4} onClick={this.logOut}>Log Out</NavItem>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}


function mapStateToProps({ activeUser, activeCity }) {
  return {
    activeUser,
    activeCity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
