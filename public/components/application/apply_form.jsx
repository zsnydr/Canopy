import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import request from 'axios';

import FormText from '../form/form_text';
import FormNumber from '../form/form_num';

class ApplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '611 Mission street',
      zip: 21233,
      city: 'San Francisco',
      numAdultOccupants: 2,
      numChildOccupants: 0,
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
      // redirect to rental history page
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
          <FormText type="street" handleChange={this.handleChange} placeholder=" eg.1060 W. Addison" />
          <FormText type="zip" handleChange={this.handleChange} placeholder=" eg.88888" />
          <br />
          <FormNumber type="numAdultOccupants" handleChange={this.handleChange} placeholder="sq. foot" />
          <FormNumber type="numChildOccupants" handleChange={this.handleChange} placeholder="2100" />
          <FormText type="pets" handleChange={this.handleChange} placeholder=" eg.88888" />
          <br />
          <FormText type="currentEmployer" handleChange={this.handleChange} placeholder=" eg.88888" />
          <FormText type="currentPosition" handleChange={this.handleChange} placeholder=" eg.88888" />
          <FormNumber type="duration" handleChange={this.handleChange} placeholder="12" />
          <br />
          <FormNumber type="annualIncome" handleChange={this.handleChange} placeholder=" eg.88888" />
          <FormText type="supervisorName" handleChange={this.handleChange} placeholder=" eg.88888" />
          <FormNumber type="supervisorPhone" handleChange={this.handleChange} placeholder="12" />
          <br />
          <FormText type="eSign" handleChange={this.handleChange} placeholder=" eg.88888" />
          <br />
          <Button onClick={this.onFormSubmit} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default ApplyForm;
