import { FETCH_USER_DOC, FETCH_USER_EXPENSES, FETCH_USER_INCOMES } from '../actions/types';

interface FirestoreDocument {
  id: string;
}

export interface IUserDocument extends FirestoreDocument {
  balance: number;
}

export interface IExpenseDocument extends FirestoreDocument {
  ammount: number;
}

export interface IIncomeDocument extends FirestoreDocument {
  ammount: number;
}

interface IFetchUserAction {
  type: typeof FETCH_USER_DOC;
  payload: IUserDocument;
}

interface IFetchExpensesAction {
  type: typeof FETCH_USER_EXPENSES;
  payload: IExpenseDocument[];
}

interface IFetchIncomesAction {
  type: typeof FETCH_USER_INCOMES;
  payload: IIncomeDocument[];
}

export type IFetchActions = IFetchUserAction | IFetchExpensesAction | IFetchIncomesAction;

export interface IFetchInitialState {
  readonly user: IUserDocument;
  readonly expenses: IExpenseDocument[];
  readonly incomes: IIncomeDocument[];
}
