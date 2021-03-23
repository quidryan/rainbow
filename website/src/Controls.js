import React from 'react';
import Slider from 'rc-slider';
import { log } from './App';

export class Controls extends React.Component {
  render() {
    return (
      <div className="Controls">
        <div>
          <p>Rainbow Size</p>
          <Slider min={0} max={40} step={5} value={this.props.size} onChange={this.props.onSizeChange} onBeforeChange={log} />
          <p>Red</p>
          <Slider dots min={0} max={9} value={this.props.red} onChange={this.props.onRedChange} />
          <p>Green</p>
          <Slider dots min={0} max={9} value={this.props.green} onChange={this.props.onGreenChange} />
          <p>Violet</p>
          <Slider dots min={0} max={9} value={this.props.violet} onChange={this.props.onVioletChange} />
        </div>
      </div>
    );
  }
}
