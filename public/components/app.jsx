import React from 'react';
import ReactDOM from 'react-dom';

// const App = () => {
//   return (
//     <div>
//       Contents will go here or there or anywhere lol
//     </div>
//   );
// };

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'dan': 'abramov' };
  }

  render() {
    return (
      <div>
        Contents will go here to there or anywhere
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'))