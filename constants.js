export const INITIAL_STATE = {
  code: [],
  activeGuess: [null, null, null, null],
  activePeg: [false, false, false, false],
  currentRound: 0,
  guessedRows: [],
  winGame: false,
};

export const COLORS = ['a', 'b', 'c', 'd', 'e', 'f']; //peg colors
export const HINT_COLORS = { WHITE: 'w', RED: 'r' };
export const PEG_COUNT = 4; //number of pegs
export const ROUNDS = 10; //number of rounds
