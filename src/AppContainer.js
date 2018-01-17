import React, { Component } from 'react';
import App from './App';

const range = (n) => {
  const result = [];

  for (let i = 0; i < n; i += 1) {
    result.push(i);
  }

  return result;
};

const createCard = (label, index) => ({
  inPlay: false,
  label,
  index,
  isMatched: false,
});

const createDeck = (n) => {
  const labelArray = ['coins10', 'coins10', 'coins20', 'coins20', 'freeGuy', 'freeGuy',
    'mushroom', 'mushroom', 'mushroom', 'mushroom', 'flower', 'flower',
    'flower', 'flower', 'star', 'star', 'star', 'star'];
  let labelSize = n;
  let i;
  let temp;
  while (labelSize) {
    i = Math.floor(Math.random() * labelSize);
    labelSize -= 1;
    temp = labelArray[labelSize];
    labelArray[labelSize] = labelArray[i];
    labelArray[i] = temp;
  }

  return range(n).map((index) => (
    createCard(labelArray[index], index)
  ));
}
class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: createDeck(18),
      attempts: 0,
      bestScore: null,
    };
    this.flipFirst = this.flipFirst.bind(this);
    this.flipSecond = this.flipSecond.bind(this);
    this.randomizeDeck = this.randomizeDeck.bind(this);
    this.reset = this.reset.bind(this);
  }

  randomizeDeck() {
    const cards = this.state.cards;
    let n = cards.length;
    let i;
    let temp;
    while (n) {
      i = Math.floor(Math.random() * n);
      n -= 1;
      temp = cards[n];
      cards[n] = cards[i];
      cards[i] = temp;
      cards[n].index = n;
      cards[i].index = i;
    }
    this.setState({
      cards: cards,
    });
  }

  reset() {
    this.setState({
      cards: this.state.cards.map((card, index) => (
        { ...card, inPlay: false, isMatched: false }
      )),
      attempts: 0,
    });
    setTimeout(() => {
      this.randomizeDeck();
    }, 500);
  }

  flipFirst(index) {
    this.setState({
      cards: this.state.cards.map((card) => {
        if (index === card.index) {
          // return Object.assign({}, card, { inPlay: true} );
          return { ...card, inPlay: true };
        }

        return card;
      }),
      attempts: this.state.attempts + 1,
    });
  }

  flipSecond(index) {
    this.setState({
      cards: this.state.cards.map((card) => {
        if (index === card.index) {
          // return Object.assign({}, card, { inPlay: true} );
          if (typeof window.Audio === "function") {
            const audio = new Audio('./assets/audio/match.wav');
            console.log(audio);
            audio.play();
          }
          return { ...card, inPlay: true };
        }

        return card;
      }),
    });
    setTimeout(() => {
      this.checkMatch();
    }, 700);
  }

  checkMatch() {
    if (this.isWinner()) {
      const cards = this.state.cards.map((card) => {
        return { ...card, inPlay: false, isMatched: card.inPlay ? true : card.isMatched }
      });

      this.setState({
        cards,
        bestScore: this.calculateBestScore(cards)
      })
    } else {
      this.setState({
        cards: this.state.cards.map((card) => {
          return { ...card, inPlay: false }
        })
      })
    }
  }

  calculateBestScore(cards) {
    if (cards.filter((card) => (
        card.isMatched
        )).length === cards.length
    ) {
      return typeof this.state.bestScore === 'number' ?
        Math.min(this.state.bestScore, this.state.attempts) : 
        this.state.attempts;
    } else {
      return this.state.bestScore;
    }
  }

  isWinner() {
    const flippedCards = this.state.cards.filter((card) => (
      card.inPlay
    ));
    return flippedCards[0].label === flippedCards[1].label;
  }

  render() {
    return (
      <App
        flipFirst={this.flipFirst}
        flipSecond={this.flipSecond}
        reset={this.reset}
        cards={this.state.cards}
        attempts={this.state.attempts}
        bestScore={this.state.bestScore}
      />
    );
  }
}

function checkMatch(card_one, card_two) {
  return card_one.label === card_two.label;
}

export default AppContainer;