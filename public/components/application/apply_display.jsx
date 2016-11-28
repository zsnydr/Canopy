import React, { Component } from 'react';
import request from 'axios';

class ApplicationDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoMounted: false,
      name: 'Victor Choi',
      dob: 1991.0301,
      phone: 5073015775,
      city: 'San Francisco',
      state: 'CA',
      street: '611 Mission Street',
      zip: 94107,
      numAdultOccupants: 2,
      numChildOccupants: 1,
      emergencyContact: 'Victor Choi',
      emergencyNumber: 5073015775,
      relationship: 'myselffffff',
      pets: 'Snails and dolphins',
      currentEmployer: 'Josh',
      position: 'intern',
      duration: 12,
      annualIncome: 3000,
      supervisorName: 'Zack',
      supervisorPhone: 5073015775,
      eSign: 'Victor Choi'
    };
  }

  componentDidMount() {
    console.log('Making get request to get application information from db: ', this.props.renterId);
    request.get(`/api/application/${this.props.renterId}`)
    .then((res) => {
      const application = res.data;
      console.log('got application back from server');
      console.log('this is what I got: ', application);
      this.setState({
        infoMounted: true,
        name: application.name,
        dob: application.dob,
        phone: application.phone,
        city: application.city,
        state: application.state,
        street: application.street,
        zip: application.zip,
        numAdultOccupants: application.numAdultOccupants,
        numChildOccupants: application.numChildOccupants,
        emergencyContact: application.emergencyContact,
        emergencyNumber: application.emergencyNumber,
        relationship: application.relationship,
        pets: application.pets,
        currentEmployer: application.currentEmployer,
        position: application.position,
        duration: application.duration,
        annualIncome: application.annualIncome,
        supervisorName: application.supervisorName,
        supervisorPhone: application.supervisorPhone,
        eSign: application.eSign
      });
    });
  }
  render() {
    if (!this.state.infoMounted) {
      return <div>Fetching application information</div>;
    }
    return (
      <div className="application_form">
        <div className="application_intro">
          <h1>Application to Rent </h1>
          <h3>Individual application required for each adult occupant.</h3>
        </div>
        <div className="row">
          <div className="col-sm-2">Address</div><div className="col-sm-2">:{this.state.street} </div>
          <div className="col-sm-3">{this.state.city}</div><div className="col-sm-2">, {this.state.state}{this.state.zip} </div>
        </div>
        <div className="row">
          <div className="col-sm-2">Adults</div><div className="col-sm-2">: {this.state.numAdultOccupants}</div>
          <div className="col-sm-2">Children</div><div className="col-sm-2">: {this.state.numChildOccupants}</div>
          <div className="col-sm-2">pets</div><div className="col-sm-2">:{this.state.pets}</div>
        </div>
        <div className="row">
          <div className="col-sm-2">Current Employer</div><div className="col-sm-2">: {this.state.currentEmployer}</div>
          <div className="col-sm-2"> position</div><div className="col-sm-2">: {this.state.position}</div>
          <div className="col-sm-2"> duration</div><div className="col-sm-2">: {this.state.duration}</div>
        </div>
        <div className="row">
          <div className="col-sm-2">Annual Income</div><div className="col-sm-2">: {this.state.annualIncome}</div>
          <div className="col-sm-2">Supervisor Name</div><div className="col-sm-2">: {this.state.supervisorName}</div>
          <div className="col-sm-2"> Supervisor Phone</div><div className="col-sm-2">: {this.state.supervisorPhone}</div>
        </div>
        <div className="row">
          <div className="col-sm-2">eSign</div><div className="col-sm-2">: {this.state.eSign}</div>
        </div>
      </div>
    );
  }
};

export default ApplicationDisplay;
