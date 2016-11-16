import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, DropdownButton, MenuItem, InputGroup, Button } from 'react-bootstrap';
import request from 'axios';

import Form_text from '../components/form_text.jsx';

import selectCity from '../actions/select_city';
import selectListing from '../actions/select_listing';
class ApplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      unitNumber: 0,
      city: '',
      state: '',
      zip: 0,
      beds: 0,
      baths: 0,
      rent: 0,
      sqFoot: 0,
      dogs: false,
      cats: false,
      term: 0,
      availableDate: '',
      host_id: 1,
      images: [],
      newListing: []
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.setImages = this.setImages.bind(this);
    this.setActiveListing = this.setActiveListing.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    request.get(`/api/cities/${this.state.city}, ${this.state.state}`)
    .then((city) => {
      const newListing = Object.assign({
        city_id: city.data.id
      }, this.state);
      this.props.selectCity(city.data);
      return request.post('/api/listings', newListing);
    })
    .then((listing) => {
      this.setState({ newListing:listing.data });
    });
  }

  setActiveListing() {
    const newActiveListing = Object.assign({
      images: this.state.images },
      this.state.newListing);
    this.props.selectListing(newActiveListing);
    browserHistory.push(`/content/listing/${this.state.newListing.id}`);
  }

  handleClick(key) {
    return () => {
      const state = {};
      state[key] = !this.state[key];
      this.setState(state);
    };
  }

  handleSelect(key) {
    return (e) => {
      const state = {};
      state[key] = e;
      this.setState(state);
    };
  }

  handleChange(key) {
    return (e) => {
      const state = {};
      state[key] = e.target.value;
      this.setState(state);
    };
  }

  render() {
    if (!this.state.newListing.id) {
      return (
        <div className="listingForm">
          <Form inline>
            <Form_text type="city" handleChange={this.handleChange} placeholder=" eg.Chicago" />
            <Form_text type="state" handleChange={this.handleChange} placeholder=" eg.Illinois" />
            <FormGroup controlId="formInlineAddress">
              <ControlLabel>address</ControlLabel>
              <FormControl onChange={this.handleChange('street')} type="address" placeholder="eg. 1060 W. Addison" />
            </FormGroup>
            <FormGroup controlId="formInlineUnit">
              <ControlLabel>address 2</ControlLabel>
              <FormControl onChange={this.handleChange('unitNumber')} placeholder="unit" />
            </FormGroup>
            <FormGroup controlId="formInlineZip">
              <ControlLabel>zip</ControlLabel>
              <FormControl onChange={this.handleChange('zip')} type="number" placeholder="60016" />
            </FormGroup>
            <br />

            <DropdownButton
              componentClass={InputGroup.Button}
              id="input-dropdown-addon"
              title={this.state.beds || 'Beds'}
              onSelect={this.handleSelect('beds')}
            >
              <MenuItem eventKey="1">1</MenuItem>
              <MenuItem eventKey="2">2</MenuItem>
              <MenuItem eventKey="3">3</MenuItem>
              <MenuItem eventKey="4">4</MenuItem>
              <MenuItem eventKey="5">5</MenuItem>
            </DropdownButton>

            <DropdownButton
              componentClass={InputGroup.Button}
              id="input-dropdown-addon"
              title={this.state.baths || 'Baths'}
              key="baths"
              onSelect={this.handleSelect('baths')}
            >
              <MenuItem eventKey="1">1</MenuItem>
              <MenuItem eventKey="2">2</MenuItem>
              <MenuItem eventKey="3">3</MenuItem>
              <MenuItem eventKey="4">4</MenuItem>
              <MenuItem eventKey="5">5</MenuItem>
            </DropdownButton>
            <FormGroup controlId="square foot">
              <ControlLabel>sq. foot</ControlLabel>
              <FormControl onChange={this.handleChange('sqFoot')} type="number" placeholder="sq. foot" />
            </FormGroup>
            <FormGroup controlId="rent">
              <ControlLabel>rent</ControlLabel>
              <FormControl onChange={this.handleChange('rent')} type="number" placeholder="2100" />
            </FormGroup>
            <FormGroup controlId="term">
              <ControlLabel>term</ControlLabel>
              <FormControl onChange={this.handleChange('term')} type="number" placeholder="12" />
            </FormGroup>
            <br />
            <Checkbox key="dogs" onClick={this.handleClick('dogs')} inline>
              dogs
            </Checkbox>
            <Checkbox key="cats" onClick={this.handleClick('cats')} inline>
              cats
            </Checkbox>
            <br />
            <FormGroup controlId="date">
              <ControlLabel>Available Date</ControlLabel>
              <FormControl onChange={this.handleChange('availableDate')} type="date" placeholder="yyy-mm-dd" />
            </FormGroup>
            <Button onClick={this.onFormSubmit} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }

    return (
      <div>
        <Form>
          <Dropzone
            setImages={this.setImages}
            setActiveListing={this.setActiveListing}
            listingId={this.state.newListing.id}
          />
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing, selectCity }, dispatch);
}

export default connect(null, mapDispatchToProps)(ApplyForm);
