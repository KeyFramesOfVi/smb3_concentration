import React, { Component } from 'react';

class Card extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.matchedCardCount === this.props.totalCardCount) {
      return;
    } else if (this.props.inPlay || this.props.isMatched) {
      return;
    } else if (this.props.flippedCardCount === 0) { 
      this.props.flipFirst(this.props.index);
    } else if (this.props.flippedCardCount === 1) {
      this.props.flipSecond(this.props.index);
    }
  }

  render() {
    return (
      <div className={this.props.inPlay || this.props.isMatched ? "card flipped" : "card"} onClick={this.onClick}>
        <div className="top"> </div>
        <div className={"bottom " + this.props.label}> </div>
      </div>
    );
  }
}

export default Card;