import { combineReducers } from 'redux';
import cards from './modules/cards';
import attempts from './modules/attempts';
import bestScore from './modules/bestScore';
export default combineReducers({
  cards,
  attempts,
  bestScore,
});
