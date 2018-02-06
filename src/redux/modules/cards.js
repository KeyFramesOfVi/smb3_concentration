// const matchSound = new Audio('./assets/audio/match.wav'),
// const noMatchSound = new Audio('./assets/audio/no-match.wav'),
// const winSound = new Audio('./assets/audio/win.wav'),

// const playMatchSound = () => {
//   this.state.matchSound.play();
// };

// const playNoMatchSound = () => {
//   this.state.noMatchSound.play();
// };

// const playWinSound= () => {
//   this.state.winSound.play();
// };

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

  return range(n).map(index => (
    createCard(labelArray[index], index)
  ));
};

const isWinner = (cards) => {
  const flippedCards = cards.filter(card => (
    card.inPlay
  ));
  return flippedCards[0].label === flippedCards[1].label;
};

// const FLIP_FIRST = 'FLIP_FIRST';

export default (state = createDeck(18), action) => {
  if (action.type === 'RESET') {
    return state.map(card => (
      { ...card, inPlay: false, isMatched: false }
    ));
  } else if (action.type === 'FLIP_FIRST') {
    return state.map((card) => {
      if (action.index === card.index) {
        return { ...card, inPlay: true };
      }
      return card;
    });
  } else if (action.type === 'FLIP_SECOND') {
    return state.map((card) => {
      if (action.index === card.index) {
        return { ...card, inPlay: true };
      }
      return card;
    });
  } else if (action.type === 'CHECK_MATCH') {
    if (isWinner(state)) {
      // this.playMatchSound();
      return state.map(card => (
        { ...card, inPlay: false, isMatched: card.inPlay ? true : card.isMatched }
      ));
    }
    // this.playNoMatchSound();
    return state.map(card => (
      { ...card, inPlay: false }
    ));
  } else if (action.type === 'RANDOMIZE_DECK') {
    const cards = [...state];
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
    return cards;
  }

  return state;
};
