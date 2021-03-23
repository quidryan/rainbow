import React from 'react';
import { log, capitalize } from './App';
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

  // state.realRed, realRed
  primary(color, previous, updated) {
    const diffBudget = previous - updated; // int, purposefully backwards
    const intBudget = 9 - updated;
    const calculated = {diffBudget, intBudget}

    const final = Math.round(updated);
    calculated[color] = final;

    calculated['real' + capitalize(color)] = updated

    return calculated
  }

  secondary(color, previous, primary) {
    var diffBudget = primary.diffBudget
    const eachBudget = diffBudget / 2; // for secondary and ternary

    var real = previous + eachBudget;
    if (real < 0 || real > 9) {
      diffBudget += real;
      real = 0;
    } else {
      diffBudget -= eachBudget;
    }

    const calculated = {diffBudget}

    const final = Math.round(real);
    calculated[color] = final;

    calculated['intBudget'] = primary.intBudget - final

    calculated['real' + capitalize(color)] = real

    return calculated
  }

  ternary(color, previous, secondary) {
    const real = previous + secondary.diffBudget;
    const final = secondary.intBudget

    const calculated = {};
    calculated[color] = final;
    calculated['real' + capitalize(color)] = real;
    return calculated
  }

  handleRedChange(realRed) {
    this.setState(function (state, _props) {
      const p = this.primary('red', state.realRed, realRed)
      const s = this.secondary('green', state.realGreen, p)
      const t = this.ternary('violet', state.realViolet, s)
      log({ ...p, ...s, ...t})
      return {
        ...p,  // red
        ...s, // green
        ...t // violet
      };
    });
  }

  handleGreenChange(green) {
    this.setState(function (state, _props) {
        const p = this.primary('green', state.realGreen, green)
        const s = this.secondary('violet', state.realViolet, p)
        const t = this.ternary('red', state.realRed, s)
        log({ ...p, ...s, ...t})
        return {
          ...p,  // green
          ...s, // violet
          ...t // red
        };
      });
  }

  handleVioletChange(violet) {
    this.setState(function (state, _props) {
        const p = this.primary('violet', state.realViolet, violet)
        const s = this.secondary('red', state.realRed, p)
        const t = this.ternary('green', state.realGreen, s)
        log({ ...p, ...s, ...t})
        return {
          ...p,  // violet
          ...s, // red
          ...t // green
        };
      });  
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
