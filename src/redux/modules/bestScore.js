import Cookies from 'js-cookie';

export default (state = +Cookies.get('bestScore') || 0, action) => {

  if (action.type === 'CALCULATE_BEST_SCORE') {
    if (
      action.cards.filter(card => card.isMatched).length === action.cards.length
    ) {
      // this.playWinSound();
      const newBestScore = state !== 0 ?
        Math.min(state, action.attempts) :
        action.attempts;
      Cookies.set('bestScore', newBestScore);
      return newBestScore;
    }
    return state;
  }

  return state;
};
