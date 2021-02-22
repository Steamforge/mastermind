import {
  CHANGE_CODE,
  CHANGE_GUESS,
  CHANGE_PEG,
  CHANGE_ROUND,
  CHANGE_ROW,
  CHANGE_WIN,
  UPDATE_GUESS_ROW,
} from './actions';

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
    case CHANGE_ROUND:
      return {
        ...state,
        currentRound: action.payload.data,
      };
    case CHANGE_ROW:
      return {
        ...state,
        guessedRows: action.payload.data,
      };
    case CHANGE_WIN:
      return {
        ...state,
        winGame: action.payload.data,
      };
    case UPDATE_GUESS_ROW:
      return {
        ...state,
        activePeg: action.payload.data.peg,
        activeGuess: action.payload.data.guess,
      };

    default:
      return state;
  }
};

export default reducer;
