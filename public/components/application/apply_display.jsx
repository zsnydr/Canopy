import React from 'react';
import request from 'axios';

const ApplicationDisplay = (props) => {
  const renderApplicationContent = (renterId) => {
    return request.get(`/api/application/${renterId}`);
  };

  return (
    <div className="container">
      Application Page
      {renderApplicationContent(props.renterId).then((application) => (
        <div>
          {application.}
        </div>
      ))}
    </div>
  );
};

export default ApplicationDisplay;
