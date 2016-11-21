import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Form, Checkbox, Button } from 'react-bootstrap';
import request from 'axios';

import ApplicationForm from '../components/form/form_num';
import ApplicationView from '../components/form/form_text';

import selectCity from '../actions/select_city';

class ApplicationPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.applicationType.type === 'form') {
      return <ApplicationForm />;
    } else if (this.props.applicationType.type === 'view') {
      return <ApplicationView renterId={this.props.applicationType.renterId}/>;
    } else {
      return <div> What have you done?</div>
    }
  }
}

function mapStateToProps({ activeUser, applicationType }) {
  return {
    activeUser,
    applicationType
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);
