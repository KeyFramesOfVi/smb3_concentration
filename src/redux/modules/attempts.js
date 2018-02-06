export default (state = 0, action) => {
  if (action.type === 'RESET') {
    return 0;
  } else if (action.type === 'FLIP_FIRST') {
    return state + 1;
  }

  return state;
};
