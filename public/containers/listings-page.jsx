import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListingsList from '../components/listings_list';
import GoogleMaps from '../components/google_maps';
import CitySearch from './city-search';
import selectListing from '../actions/select_listing';


class ListingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bedFilter: 0,
      bathFilter: 0,
      minRentFilter: 0,
      maxRentFilter: 100000,
      bedFilterHeader: 'Beds',
      bathFilterHeader: 'Baths',
      minRentFilterHeader: '',
      maxRentFilterHeader: '',
      sorter: 'id',
      selectListing
    };

    this.updateBedFilter = this.updateBedFilter.bind(this);
    this.updateBathFilter = this.updateBathFilter.bind(this);
    this.updateMinRentFilter = this.updateMinRentFilter.bind(this);
    this.updateMaxRentFilter = this.updateMaxRentFilter.bind(this);
    this.updateSorter = this.updateSorter.bind(this);
  }

  updateBedFilter(numBeds) {
    this.setState({
      bedFilter: numBeds,
      bedFilterHeader: numBeds ? `${numBeds}+` : 'Beds'
    });
  }

  updateBathFilter(numBaths) {
    this.setState({
      bathFilter: numBaths,
      bathFilterHeader: numBaths ? `${numBaths}+` : 'Baths'
    });
  }

  updateMinRentFilter(minRent) {
    this.setState({
      minRentFilter: minRent,
      minRentFilterHeader: minRent ? `$${minRent}` : ''
    });
  }

  updateMaxRentFilter(maxRent) {
    this.setState({
      maxRentFilter: maxRent,
      maxRentFilterHeader: maxRent ? `$${maxRent}` : ''
    });
  }

  updateSorter(sorter) {
    console.log('GOT HERE', sorter)
    this.setState({
      sorter
    });
  }

  render() {
    if (Array.isArray(this.props.listingData)) {
      return (
        <div className="listingsPage">
          <div>Waiting for data...</div>
        </div>
      );
    }

    this.props.listingData.listings = this.props.listingData.listings || [];

    const filtered = this.props.listingData.listings.filter((listing) => {
      return listing.beds >= this.state.bedFilter &&
             listing.baths >= this.state.bathFilter &&
             listing.rent >= this.state.minRentFilter &&
             listing.rent <= this.state.maxRentFilter;
    }).sort((a, b) => {
      return a[this.state.sorter] - b[this.state.sorter];
    });

    return (
      <div className="listingsPage">
        <div className="listings_list">
          {// include citySearch here
          }
          <ListingsList
            listings={filtered}
            city={this.props.listingData.name}
            state={this.props.listingData.state}
            updateBedFilter={this.updateBedFilter}
            updateBathFilter={this.updateBathFilter}
            updateMinRentFilter={this.updateMinRentFilter}
            updateMaxRentFilter={this.updateMaxRentFilter}
            updateSorter={this.updateSorter}
            bedFilterHeader={this.state.bedFilterHeader}
            bathFilterHeader={this.state.bathFilterHeader}
            minRentFilterHeader={this.state.minRentFilterHeader}
            maxRentFilterHeader={this.state.maxRentFilterHeader}
            selectListing={this.props.selectListing}
          />
        </div>
        <div className="listings_map">
          <GoogleMaps
            listings={filtered}
            focalLat={this.props.listingData.lat}
            focalLon={this.props.listingData.lon}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ listingData }) {
  return {
    listingData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsPage);
