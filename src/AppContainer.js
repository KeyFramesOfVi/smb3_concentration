import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from './App';

export default connect(
  state => (
    {
      cards: state.cards,
      attempts: state.attempts,
      bestScore: state.bestScore,
    }
  ),
  dispatch => (
    {
      flipFirst: index => dispatch({ type: 'FLIP_FIRST', index }),
      reset: () => dispatch((dispatch) => {
        dispatch({ type: 'RESET' });
        setTimeout(() => {
          dispatch({ type: 'RANDOMIZE_DECK' });
        }, 500);
      }),
      flipSecond: index => dispatch((dispatch, getState) => {
        dispatch({ type: 'FLIP_SECOND', index });
        setTimeout(() => {
          dispatch({ type: 'CHECK_MATCH' });
          const state = getState();
          dispatch({ type: 'CALCULATE_BEST_SCORE', cards: state.cards, attempts: state.attempts });
        }, 700);
      }),
    }
  ),
)(App);
