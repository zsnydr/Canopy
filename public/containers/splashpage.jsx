import React, { Component } from 'react';
import styles from '../stylesheets/main/splash.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import selectCity from '../actions/select_city';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''

    };
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.selectCity(this.state.term);
  }

  render() {
    return (
      <div className='main' >
        <form onSubmit={this.onFormSubmit.bind(this)}>
          Enter your city:
          <input onChange={this.onInputChange.bind(this)} value={this.props.term} ></input>
          <input type='submit'></input>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeCity: state.activeCity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCity }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
