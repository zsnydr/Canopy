import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import selectCity from '../actions/select_city';
import updateListings from '../actions/update_listings';

class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.selectCity(this.state.term);
    this.props.updateListings(this.state.term);
  }

  render() {
    return (
      <div className="main">
        <form onSubmit={this.onFormSubmit}>
          Enter your city:
          <input onChange={this.onInputChange} value={this.props.term} />
          <input type="submit" />
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
  return bindActionCreators({ selectCity, updateListings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySearch);
