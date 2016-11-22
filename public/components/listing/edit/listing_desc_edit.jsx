import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from 'superagent';
import { browserHistory } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

import selectListing from '../../../actions/select_listing';

class ListingDescEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.activeListing.id,
      beds: this.props.activeListing.beds,
      baths: this.props.activeListing.baths,
      cats: this.props.activeListing.cats,
      dogs: this.props.activeListing.dogs,
      host_id: this.props.activeListing.host_id,
      laundry: this.props.activeListing.laundry,
      parking: this.props.activeListing.parking,
      rent: this.props.activeListing.rent,
      smoking: this.props.activeListing.smoking,
      sqFoot: this.props.activeListing.sqFoot,
      street: this.props.activeListing.street,
      term: this.props.activeListing.term,
      unitNumber: this.props.activeListing.unitNumber,
      availableDate: this.props.activeListing.availableDate.slice(0, 10),
      showModal: false,
      newListing: {}
    };

    this.updateStreet = this.updateStreet.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.updateBeds = this.updateBeds.bind(this);
    this.updateBaths = this.updateBaths.bind(this);
    this.updateRent = this.updateRent.bind(this);
    this.updateSqFoot = this.updateSqFoot.bind(this);
    this.updateAvailableDate = this.updateAvailableDate.bind(this);

    this.updateListing = this.updateListing.bind(this);
    this.closeModalAndShowListing = this.closeModalAndShowListing.bind(this);
    this.closeModalAndShowProfile = this.closeModalAndShowProfile.bind(this);
  }

  updateStreet(event) { this.setState({ street: event.target.value }); }
  updateUnit(event) { this.setState({ unit: event.target.value }); }
  updateBeds(event) { this.setState({ beds: event.target.value }); }
  updateBaths(event) { this.setState({ baths: event.target.value }); }
  updateRent(event) { this.setState({ rent: event.target.value }); }
  updateSqFoot(event) { this.setState({ sqFoot: event.target.value }); }
  updateAvailableDate(event) { this.setState({ availableDate: event.target.value }); }

  updateListing() {
    const update = request.post('/api/updateListing')
                          .send(this.state);

    update.end((err, res) => {
      if (err) { console.log('Error updating listing: ', err); }
      this.setState({ showModal: true, newListing: res.body });
    });
  }

  closeModalAndShowListing(event) {
    event.preventDefault();
    this.setState({ showModal: false });
    this.props.selectListing(this.state.newListing);
    browserHistory.push(`/content/listing/${this.state.newListing.id}`);
  }

  closeModalAndShowProfile(event) {
    event.preventDefault();
    this.setState({ showModal: false });
    browserHistory.push(`/content/profile/${this.state.newListing.host_id}`);
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Listing Updated!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.closeModalAndShowListing}>View Listing</Button>
            <Button onClick={this.closeModalAndShowProfile}>Back to Profile</Button>
          </Modal.Footer>
        </Modal>
        <div className="listingInfo">
          <div className="details">
            <h3>{this.props.activeListing.city.name}, {this.props.activeListing.city.state} {this.props.activeListing.zip}</h3><br />
            <form action="javascript:void(0)">
              Street: <input value={this.state.street} onChange={this.updateStreet} /><br />
              Unit: <input value={this.state.unit} onChange={this.updateUnit} /><br />
              Beds: <input value={this.state.beds} onChange={this.updateBeds} /><br />
              Baths: <input value={this.state.baths} onChange={this.updateBaths} /><br />
              Rent: <input value={this.state.rent} onChange={this.updateRent} /><br />
              Sq. Footage: <input value={this.state.sqFoot} onChange={this.updateSqFoot} /><br />
              Date Available: <input value={this.state.availableDate} onChange={this.updateAvailableDate} /><br />
              <input type="submit" onClick={this.updateListing} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing }, dispatch);
}

export default connect(null, mapDispatchToProps)(ListingDescEdit);
