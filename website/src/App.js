import './App.css';
import React from 'react';
import './sliders.css'
import { Column } from './Column';

export function log(value) {
  console.log(value); //eslint-disable-line
}

export function capitalize(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Make a Rainbow</h1>
        </div>
        <Column/>
        <div className="App-footer">
          <h1>Doesn't a rainbow just make everything better?</h1>
        </div>
      </div>
    );
  }
}

export default App;
