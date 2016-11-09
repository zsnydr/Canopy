import React from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

export default (props) => {
  return (
    <GoogleMapLoader
      containerElement={<div style={{ height: '100vh' }} />}
      googleMapElement={
        <GoogleMap defaultZoom={12} defaultCenter={{ lat: 37, lng: 121 }} />
      }
    />
  );
};
