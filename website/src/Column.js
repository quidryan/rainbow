import React from 'react';
import { log } from './App';
import { Controls } from "./Controls";
import { Rainbow } from "./Rainbow";

export class Column extends React.Component {
  constructor(props) {
    super(props);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleRedChange = this.handleRedChange.bind(this);
    this.handleGreenChange = this.handleGreenChange.bind(this);
    this.handleVioletChange = this.handleVioletChange.bind(this);
    this.state = {
      size: 20,
      realRed: 3.0,
      red: 3,
      realGreen: 3.0,
      green: 3,
      realViolet: 3.0,
      violet: 3,
    };
  }

  handleSizeChange(size) {
    this.setState({ size });
  }

  handleRedChange(realRed) {
    this.setState(function (state, _props) {
      var diffBudget = state.realRed - realRed; // int, purposefully backwards
      const eachBudget = diffBudget / 2; // for green and violet
      log({ eachBudget, diffBudget, realRed });

      var realGreen = state.realGreen - eachBudget;
      if (realGreen < 0 || realGreen > 9) {
        diffBudget += realGreen;
        realGreen = 0;
      } else {
        diffBudget -= eachBudget;
      }
      const realViolet = state.realViolet - diffBudget;

      const red = Math.round(realRed);
      const green = Math.round(realGreen);
      const violet = 9 - red - green;
      log({ eachBudget, diffBudget, realRed, red, realGreen, green, realViolet, violet });
      return {
        realRed, red,
        realGreen, green,
        realViolet, violet,
      };
    });
  }

  handleGreenChange(green) {
    this.setState({ green });
  }

  handleVioletChange(violet) {
    this.setState({ violet });
  }

  render() {
    const size = this.state.size;

    return (
      <div className="App-column">
        <div className="App-side">
          <Controls
            red={this.state.red}
            onRedChange={this.handleRedChange}
            green={this.state.green}
            onGreenChange={this.handleGreenChange}
            violet={this.state.violet}
            onVioletChange={this.handleVioletChange}
            size={size}
            onSizeChange={this.handleSizeChange}
          />
        </div>
        <div className="App-main">
          <Rainbow
            size={size}
            red={this.state.red}
            green={this.state.green}
            violet={this.state.violet}
          />
        </div>
      </div>
    );
  }
}
