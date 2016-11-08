import React from 'react';

import CitySearch from '../containers/city-search';
import Nav from '../components/nav';

const Splash = () => {
  return (
    <div>
      <div>
        <CitySearch />
      </div>
      <div>
        <Nav />
      </div>
    </div>
  );
};

export default Splash;
