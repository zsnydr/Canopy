import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory} from 'react-router';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, DropdownButton, MenuItem, InputGroup, Button } from 'react-bootstrap';
import request from 'axios';

import selectCity from '../actions/select_city';
import Dropzone from '../components/add_listing_image_drop';

class AddListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      unitNumber: '',
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
      newListing: {}
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
    request.post('/api/listings', listingData)
    .then((listing) => {
      this.setState({ newListing: listing.data});
    })

  }

  setImages(files) {
    this.setState({
      images: [...this.state.images, files]
    })
  }
  
  setActiveListing() {
    this.props.selectListing(this.state.newListing.extend({ images: this.state.images }));
    browserHistory.push(`/content/listing/${this.state.newlisting.id}`);
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

  componentDidUpdate() {
    this.render();
  }


  render() {
    if (!this.state.newListing.id) {
      return (
        <div className="listingForm">
          <Form inline>
            <FormGroup controlId="formInlineAddress">
              <ControlLabel>address</ControlLabel>
              <FormControl onChange={this.handleChange('street')} type="address" placeholder="eg. 1060 W. Addison" />
            </FormGroup>
            <FormGroup controlId="formInlineUnit">
              <FormControl onChange={this.handleChange('unitNumber')} placeholder="unit" />
            </FormGroup>
            <FormGroup controlId="formInlineCity">
              <ControlLabel>city</ControlLabel>
              <FormControl onChange={this.handleChange('city')} type="city" placeholder=" eg.Chicago" />
            </FormGroup>
            <FormGroup controlId="formInlineState">
              <ControlLabel>state</ControlLabel>
              <FormControl onChange={this.handleChange('state')} type="state" placeholder=" eg. Illinois" />
            </FormGroup>
            <FormGroup controlId="formInlineZip">
              <ControlLabel>zip</ControlLabel>
              <FormControl onChange={this.handleChange('zip')} type="number" placeholder="60016" />
            </FormGroup>
            <br />

            <DropdownButton
              componentClass={InputGroup.Button}
              id="input-dropdown-addon"
              title="beds"
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
              title="Baths"
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
          <Dropzone setImages={this.setImages} setActiveListing={this.setActiveListing} listingId={this.state.newListing.id} />
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ activeListing }) {
  return {
    activeListing
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddListing);
