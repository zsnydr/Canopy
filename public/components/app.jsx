import React from 'react';

import Footer from '../components/footer';

const App = (props) => {
  return (
    <div>
      <div>
        {props.children}
      </div>  
      <Footer />
    </div>);
};

export default App;
