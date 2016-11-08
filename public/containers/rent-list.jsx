import React, { Component } from 'react';
import { connect } from 'react-redux';

class RentList extends Component {
  renderRents(rent) {
    return (
      <li key={rent.id}>
        {rent.street}
      </li>
    );
  }

  render() {
    return (
      <ul>
        {this.props.rents.map(this.renderRents)}
      </ul>
    );
  }
}

function mapStateToProps({ rents }) {
  return {
    rents
  };
}

export default connect(mapStateToProps)(RentList);
