import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import request from 'axios';

import FormText from '../form/form_text';
import FormNumber from '../form/form_num';

class RentalHistoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'San Francisco',
      street: '611 Mission street',
      zip: 2123,
      landlordName: 'Josh',
      landlordPhone: 2131,
      rentalPayment: 2,
      reasonLeft: 'Victor Choi',
      application_id: 1,
      show: true
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    request.post('/api/rentalHistory', this.state)
    .then((rentalHistory) => {
      console.log('Successfullly stored this rental history data to DB: ', rentalHistory);
      this.setState({show: false});
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
      console.log (this.state);
    };
  }

  render() {
    if (this.state.show) {
      return (
        <div className="listingForm">
          <h3>Rental History</h3>
          <br />
          <Form inline>
            <FormText type="city" handleChange={this.handleChange} placeholder=" eg.Chicago" />
            <FormText type="street" handleChange={this.handleChange} placeholder=" eg.1060 W. Addison" />
            <FormText type="zip" handleChange={this.handleChange} placeholder=" eg.88888" />
            <br />
            <FormNumber type="rentalPayment" handleChange={this.handleChange} placeholder="1500" />
            <FormText type="landlordName" handleChange={this.handleChange} placeholder="Josh" />
            <FormNumber type="landlordPhone" handleChange={this.handleChange} placeholder="4088675309" />
            <br />
            <FormText type="reasonLeft" handleChange={this.handleChange} placeholder="big fight" />
            <br />
            <Button onClick={this.onFormSubmit} type="submit">
              Submit rental history
            </Button>
          </Form>
        </div>
      );
    }

    return (
      <div> success! </div>
    );
  }
}

export default RentalHistoryForm;
