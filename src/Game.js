import React, { Component } from 'react';
import Menu from './Menu';
import Board from './Board';

function Game(props) {
  return (
    <div className="container">
      <Menu
        attempts={props.attempts}
        bestScore={props.bestScore}
        reset={props.reset}
      />
      <Board
        cards={props.cards}
        flipFirst={props.flipFirst}
        flipSecond={props.flipSecond}
      />
    </div>
  );
}

export default Game;
