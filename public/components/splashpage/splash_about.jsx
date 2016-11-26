import React from 'react';

const splashAbout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 splash-about-desc">
          <h3>Searching Made Easy</h3>
          <hr />
          <p>
            Canopy is your one stop source for apartment rentals.
            We give you the inside scoop on places and neighborhoods you'll dig.
            We wrangle together the most accurate and up-to-date rentals.
          </p>
        </div>
        <div className="col-md-6 splash-about-img">
          <img src="" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 splash-about-img">
          <img src="" />
        </div>
        <div className="col-md-6 splash-about-desc">
          <h3>One Application</h3>
          <h3>Limitless Possibilities</h3>
          <hr />
          <p>
            By filling out one quick application you'll be able to apply
            to countless listings with the click of a button.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 splash-about-desc">
          <h3>Transparency</h3>
          <hr />
          <p>
            We empower landlord's to easily manage their property listings and
            quickly communicate with potential tenants only after the tenant has
            been verified.
          </p>
        </div>
        <div className="col-md-6 splash-about-img">
          <img src="" />
        </div>
      </div>
    </div>
  );
};

export default splashAbout;
