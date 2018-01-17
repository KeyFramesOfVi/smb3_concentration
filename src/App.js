import React, { Component } from 'react';
import './game.css';
import Game from './Game';

require('typeface-press-start-2p');


function App(props) {
  return (
    <Game
      flipFirst={props.flipFirst}
      flipSecond={props.flipSecond}
      reset={props.reset}
      cards={props.cards}
      attempts={props.attempts}
      bestScore={props.bestScore}
    />
  );
}

export default App;
