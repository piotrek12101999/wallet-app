import {
  FETCH_USER_DOC,
  FETCH_USER_EXPENSES,
  FETCH_USER_INCOMES,
  FETCH_USER_EXPENSES_CATEGORIES,
  FETCH_USER_INCOMES_CATEGORIES
} from '../actions/types';
import { IFetchInitialState, IFetchActions } from '../models/fetch.interfaces';

const INITIAL_STATE: IFetchInitialState = {
  user: {
    id: '',
    balance: 0
  },
  expenses: [],
  expensesCategories: [],
  incomes: [],
  incomesCategories: []
};

export default (state = INITIAL_STATE, action: IFetchActions): IFetchInitialState => {
  switch (action.type) {
    case FETCH_USER_DOC:
      return { ...state, user: action.payload };
    case FETCH_USER_EXPENSES:
      return { ...state, expenses: action.payload };
    case FETCH_USER_INCOMES:
      return { ...state, incomes: action.payload };
    case FETCH_USER_EXPENSES_CATEGORIES:
      return { ...state, expensesCategories: action.payload };
    case FETCH_USER_INCOMES_CATEGORIES:
      return { ...state, incomesCategories: action.payload };
    default:
      return state;
  }
};
