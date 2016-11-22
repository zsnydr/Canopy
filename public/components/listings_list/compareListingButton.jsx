import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';


class compareListingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star: 'star-empty',
      heart: 'heart-empty'
    };

    this.toggleButton = this.toggleButton.bind(this);
  }

  toggleButton(value) {
    if (value === 'star') {
      this.setState({ star: 'star-empty' });
    } else if (value === 'star-empty') {
      this.setState({ star: 'star' });
    } else if (value === 'heart-empty') {
      this.setState({ heart: 'heart' });
    } else {
      this.setState({ heart: 'heart-empty' });
    }
  }

  render() {
    return (
      <div>
        Compare:
        <Button
          className="compare"
          bsSize="small"
          bsStyle="info"
          onClick={() => {
            this.props.updateCompareListings(this.props.listing);
            if (this.props.listingsCompared.length < 2 || this.props.listingsCompared.indexOf(this.props.listing) >= 0) {
              this.toggleButton(this.state.star);  
            }
          }}
        >
          <Glyphicon glyph={this.state.star} />
        </Button>
        Heart:
        <Button
          className="favorite"
          bsSize="small"
          bsStyle="info"
          onClick={() => {
            this.props.addToFavorites(this.props.listing.id);
            if (this.props.activeUser.length !== 0) {
              this.toggleButton(this.state.heart);
            }
          }}
        >
          <Glyphicon glyph={this.state.heart} />
        </Button>
      </div>
    );
  }
}

export default compareListingButton;

