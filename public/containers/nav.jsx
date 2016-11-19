import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };

    this.goToExplore = this.goToExplore.bind(this);
  }

  goHome() {
    browserHistory.push('/');
  }

  goToExplore() {
    browserHistory.push('/content/addListing');
  }

  goToProfile() {
    browserHistory.push('/content/profile/1');
  }

  logOut() {
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
        <Navbar inverse collapseOnSelect>
          <Navbar.Header className="Canopy">
            <Navbar.Brand>
              <a onClick={this.goHome}>canopy</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="links" pullRight>
              <NavItem eventKey={0} onClick={this.goToProfile}>Profile</NavItem>
              <NavItem eventKey={1} onClick={this.goToSignIn}>SignIn</NavItem>
              <NavItem eventKey={2} onClick={this.goToSignUp}>SignUp</NavItem>
              <NavItem eventKey={3} onClick={this.goToExplore}>Explore</NavItem>
              <NavItem eventKey={4} onClick={this.logOut}>Log Out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

export default NavBar;
