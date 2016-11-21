import React from 'react';

const ApplicationDisplay = (props) => {

  return (
    <div className="container">
      Application Page
      {props.renterId}
    </div>
  );
};

export default ApplicationDisplay;
