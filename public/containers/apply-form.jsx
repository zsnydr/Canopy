import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Form, Checkbox, Button } from 'react-bootstrap';
import request from 'axios';

import FormText from '../components/form/form_text';
import FormNumber from '../components/form/form_num';
import FormDropdown from '../components/form/form_dropdown';
import FormDate from '../components/form/form_date';

import selectCity from '../actions/select_city';
import selectListing from '../actions/select_listing';

class ApplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '611 Mission street',
      unitNumber: 2,
      city: 'San Francisco',
      state: 'CA',
      numAdult: 2,
      numChild: 0,
      pets: 0,
      currentEmployer: 'Hack Reactor',
      currentPosition: 'Student',
      duration: 6,
      annualIncome: 0,
      supervisorName: 'Josh',
      supervisorPhone: 5073015775,
      eSign: 'Victor Choi',
      renter_id: 1
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    request.post('/api/application', this.state)
    .then((application) => {
      console.log('Successfullly stored this application data to DB: ', application);
      //reDirect to rental history page
    });
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
    return (
      <div className="listingForm">
        <Form inline>
          <FormText type="city" handleChange={this.handleChange} placeholder=" eg.Chicago" />
          <FormText type="state" handleChange={this.handleChange} placeholder=" eg.Illinois" />
          <FormText type="address" handleChange={this.handleChange} placeholder=" eg.1060 W. Addison" />
          <FormText type="unit" handleChange={this.handleChange} placeholder=" eg.#1244" />
          <FormText type="zip" handleChange={this.handleChange} placeholder=" eg.88888" />
          <br />
          <FormDropdown type="beds" items={[1, 2, 3, 4, 5]} handleSelect={this.handleSelect} />
          <FormDropdown type="baths" items={[1, 2, 3, 4, 5]} handleSelect={this.handleSelect} />
          <br />
          <FormNumber type="sqFoot" handleChange={this.handleChange} placeholder="sq. foot" />
          <FormNumber type="rent" handleChange={this.handleChange} placeholder="2100" />
          <FormNumber type="term" handleChange={this.handleChange} placeholder="12" />
          <br />
          <Checkbox key="dogs" onClick={this.handleClick('dogs')} inline>
            dogs
          </Checkbox>
          <Checkbox key="cats" onClick={this.handleClick('cats')} inline>
            cats
          </Checkbox>
          <br />
          <FormDate label="availableDate" handleChange={this.handleChange} />
          <Button onClick={this.onFormSubmit} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing, selectCity }, dispatch);
}

export default connect(null, mapDispatchToProps)(ApplyForm);
