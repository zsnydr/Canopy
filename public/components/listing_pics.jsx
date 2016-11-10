import React from 'react';

const ListingPics = (props) => {
  return (
    <div>
      {props.images.map((image) => (
        <img src={__dirname+"assets/"+image} />
      ))}
    </div>
  );
};

export default ListingPics;
