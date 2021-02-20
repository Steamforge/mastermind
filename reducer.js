import { CHANGE_CODE } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CODE:
      return {
        ...state,
        code: action.payload.data,
      };

    default:
      return state;
  }
};

export default reducer;
