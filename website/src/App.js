import './App.css';
import React from 'react';
import Slider from 'rc-slider';
import './sliders.css'

function log(value) {
  console.log(value); //eslint-disable-line
}

function Controls() {
  return (
    <div className="Controls">
      <div>
        <p>Rainbow Size</p>
        <Slider min={0} max={400} step={20} defaultValue={100} onAfterChange={log} />
        <p>Red</p>
        <Slider dots min={0} max={4} defaultValue={1} onAfterChange={log} />
        <p>Green</p>
        <Slider dots min={0} max={4} defaultValue={1} onAfterChange={log} />
        <p>Violet</p>
        <Slider dots min={0} max={4} defaultValue={1} onAfterChange={log} />
      </div>
    </div>
  );
}

class Rainbow extends React.Component {
  
  componentDidMount() {
    const canvas = this.refs.rainbow
    const ctx = canvas.getContext("2d")

    var bars = 20, i = 0, radius = canvas.width * 0.5;
    ctx.lineWidth = 4;
    
    for(i = 0; i < bars; i++, radius -= ctx.lineWidth - 1) {      // increase bar, reduce radius
      ctx.beginPath();
      ctx.arc(canvas.width * 0.5, canvas.height, radius, 0, Math.PI, true); // half circle
      ctx.strokeStyle = "hsl(" + (i / bars * 300) + ",90%,50%)";  // set color using HSL
      ctx.stroke();
    }
  }

  render() {
    return (
      <div className="View">
        <canvas ref="rainbow" width={625} height={400}/>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Make a Rainbow</h1>
      </div>
      <div className="App-column">
        <div className="App-side">
          <Controls/>
        </div>
        <div className="App-main">
          <Rainbow/>
        </div>
      </div>
      <div className="App-footer">
        <h1>Doesn't a rainbow just make everything better?</h1>
      </div>
    </div>
  );
}

export default App;
