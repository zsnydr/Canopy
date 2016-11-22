import React from 'react';

import Footer from '../components/footer';

const App = (props) => {
  return (
    <div>
      {props.children}
      <Footer />
    </div>);
};

export default App;
