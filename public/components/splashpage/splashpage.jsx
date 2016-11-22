import React from 'react';

import CitySearch from '../../containers/city-search';
import Nav from '../../containers/nav';
import TopCities from './top_cities';

const Splash = () => {
  return (
    <div>
      <div className="main">
        <div>
          <Nav />
        </div>
        <div>
          <h1>canopy</h1>
          <CitySearch />
        </div>
      </div>
      <div className="mainInfo">
        <TopCities />
      </div>
       <div className="canopyTeam">
        Even further below home page
      </div>
    </div>
  );
};

export default Splash;
