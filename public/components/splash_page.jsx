import React from 'react';
import styles from '../stylesheets/main/splash.scss';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='main' >
        <form>
          Enter your city
          <input></input>
        </form>
      </div>
    );
  }
}
