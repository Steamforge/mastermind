import { CHANGE_CODE, CHANGE_GUESS, CHANGE_PEG, CHANGE_ROW } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CODE:
      return {
        ...state,
        code: action.payload.data,
      };
    case CHANGE_GUESS:
      return {
        ...state,
        activeGuess: action.payload.data,
      };
    case CHANGE_PEG:
      return {
        ...state,
        activePeg: action.payload.data,
      };
    case CHANGE_ROW:
      return {
        ...state,
        guessedRows: action.payload.data,
      };

    default:
      return state;
  }
};

export default reducer;
