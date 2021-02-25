import * as actions from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_CODE:
      return {
        ...state,
        code: action.payload.data,
      };
    case actions.CHANGE_GUESS:
      return {
        ...state,
        activeGuess: action.payload.data,
      };
    case actions.CHANGE_PEG:
      return {
        ...state,
        activePeg: action.payload.data,
      };
    case actions.CHANGE_WIN:
      return {
        ...state,
        winGame: action.payload.data.win,
        showCode: action.payload.data.show,
      };
    case actions.UPDATE_GUESS_ROW:
      return {
        ...state,
        activeGuess: action.payload.data.guess,
        activePeg: action.payload.data.peg,
      };
    case actions.SUBMIT_GUESS:
      return {
        ...state,
        activeGuess: action.payload.data.guess,
        activePeg: action.payload.data.peg,
        currentRound: action.payload.data.round,
        guessedRows: action.payload.data.row,
      };
    case actions.RESET_GAME:
      return {
        ...state,
        activeGuess: action.payload.data.guess,
        activePeg: action.payload.data.peg,
        code: action.payload.data.code,
        currentRound: action.payload.data.round,
        guessedRows: action.payload.data.row,
        showCode: action.payload.data.show,
        winGame: action.payload.data.win,
      };
    default:
      return state;
  }
};

export default reducer;
