import { FETCH_USER_DOC, FETCH_USER_EXPENSES, FETCH_USER_INCOMES } from '../actions/types';
import { IFetchInitialState, IFetchActions } from '../models/fetch.interfaces';

const INITIAL_STATE: IFetchInitialState = {
  user: {
    id: '',
    balance: 0
  },
  expenses: [],
  incomes: []
};

export default (state = INITIAL_STATE, action: IFetchActions): IFetchInitialState => {
  switch (action.type) {
    case FETCH_USER_DOC:
      return { ...state, user: action.payload };
    case FETCH_USER_EXPENSES:
      return { ...state, expenses: action.payload };
    case FETCH_USER_INCOMES:
      return { ...state, incomes: action.payload };
    default:
      return state;
  }
};
