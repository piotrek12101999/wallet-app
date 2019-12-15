import {
  FETCH_USER_DOC,
  FETCH_USER_EXPENSES,
  FETCH_USER_INCOMES,
  FETCH_USER_EXPENSES_CATEGORIES
} from '../actions/types';

interface FirestoreDocument {
  id: string;
}

export interface IUserDocument extends FirestoreDocument {
  balance: number;
}

export interface IExpenseDocument extends FirestoreDocument {
  name: string;
  ammount: number;
  date: Date;
  categories: string[];
}

export interface IExpenseCategoryDocument extends FirestoreDocument {
  name: string;
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

interface IFetchExpensesCategoriesAction {
  type: typeof FETCH_USER_EXPENSES_CATEGORIES;
  payload: IExpenseCategoryDocument[];
}

interface IFetchIncomesAction {
  type: typeof FETCH_USER_INCOMES;
  payload: IIncomeDocument[];
}

export type IFetchActions =
  | IFetchUserAction
  | IFetchExpensesAction
  | IFetchExpensesCategoriesAction
  | IFetchIncomesAction;

export interface IFetchInitialState {
  readonly user: IUserDocument;
  readonly expenses: IExpenseDocument[];
  readonly expensesCategories: IExpenseCategoryDocument[];
  readonly incomes: IIncomeDocument[];
}
