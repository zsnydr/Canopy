import request from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, FormControl, Form } from 'react-bootstrap';
import selectCity from '../actions/select_city';
import updateListings from '../actions/update_listings';
import { browserHistory } from 'react-router';


class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      term: ''
    };
    this.isSubmitted = false;
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.selectCity(this.state.term);
    this.isSubmitted = true;
  }

  componentDidUpdate() {
    if (this.props.activeCity && this.isSubmitted) { 
      this.props.updateListings(this.props.activeCity.id);
      browserHistory.push('/content/listings');
      this.isSubmitted = false;
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onFormSubmit} inline>
          <FormControl
            id="formControlsText"
            type="text"
            label="Text"
            placeholder="apartment search by city eg. San Francisco, Ca"
            onChange={this.onInputChange}
            value={this.state.term}
          />
          <Button className="citySelect" onClick={this.onFormSubmit} bsStyle="primary">submit</Button>
        </Form>
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
  return bindActionCreators({ selectCity, updateListings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySearch);
