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
      term: '',
      isSubmitted: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.selectCity(this.state.term);
    this.setState({
      isSubmitted: true
    }) 
  }

  componentDidUpdate() {
    if (this.props.activeCity && this.state.isSubmitted) { 
      this.props.updateListings(this.props.activeCity.id);
      browserHistory.push('/content/listings');
      this.setState({
        isSubmitted: false
      });
    }
    // navigator.geolocation.getCurrentPosition((pos) => {
      // request.get(`/api/position?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
      // request.get('/api/position?lat=37.7749295&lon=-122.4194155')
      // .then((data) => {
      //   this.setState({ term: data.data });
      // });
    // });
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
