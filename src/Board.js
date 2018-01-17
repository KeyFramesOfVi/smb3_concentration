import React, { Component } from 'react';
import Card from './Card';

class Board extends Component {
  render() {
    const flippedCardCount = this.props.cards.filter((card) => (
      card.inPlay
    )).length;
    const matchedCardCount = this.props.cards.filter((card) => (
      card.isMatched
    )).length;
    
    return (
      <div>
        {
          this.props.cards.map((card) => {
            return (
              <div className="card-wrapper" key={card.index}>
                <Card
                  inPlay={card.inPlay}
                  isMatched={card.isMatched}
                  label={card.label}
                  flipFirst={this.props.flipFirst}
                  flipSecond={this.props.flipSecond}
                  index={card.index}
                  flippedCardCount={flippedCardCount}
                  matchedCardCount={matchedCardCount}
                  totalCardCount={this.props.cards.length}
                />
              </div>
            );
          })
        }
      </div>    
    );
  }
}

export default Board;