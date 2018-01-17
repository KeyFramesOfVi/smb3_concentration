import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.reset();
  }
  render() {
    return (
      <section className="menu">
        <p> Attempts: {this.props.attempts} </p>
        <span className="divider">|</span>
        <p> Best Score: {this.props.bestScore} </p>
        <p className="reset" onClick={this.onClick}>Reset</p>
      </section>
    );
  }
}

export default Menu;
