import React, { Component } from 'react';

import CurrentPicture from './listing_pic_current';

class ListingPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 'assets/'+this.props.images[0]
    };
    this.updateCurrentImage = this.updateCurrentImage.bind(this);
  }

  updateCurrentImage(event) {
    this.setState({
      currentImage: event.target.src.slice(22)
    });
  }

  render() {
    return (
      <div>
        <CurrentPicture picture={this.state.currentImage} />
        {this.props.images.map((image) => (
          <img
            className="smallPics"
            key={image}
            src={__dirname+"assets/"+image}
            onClick={this.updateCurrentImage} />
        ))}
      </div>
    );
  }
}

export default ListingPics;

