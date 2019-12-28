import {
  FETCH_USER_DOC,
  FETCH_USER_EXPENSES,
  FETCH_USER_INCOMES,
  FETCH_USER_EXPENSES_CATEGORIES,
  FETCH_USER_INCOMES_CATEGORIES
} from '../actions/types';

interface IFirestoreDocument {
  id: string;
}

export interface IUserDocument extends IFirestoreDocument {
  balance: number;
}

export interface IExpenseData {
  name: string;
  logo?: string;
  ammount: number;
  date: Date;
  categories: string[];
}
export type IExpenseDocument = IFirestoreDocument & IExpenseData;

export interface IIncomeData {
  ammount: number;
  date: Date;
  categories: string[];
}

export type IIncomeDocument = IFirestoreDocument & IIncomeData;

export interface ICategoryDocument extends IFirestoreDocument {
  name: string;
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

interface IFetchCategoriesAction {
  type: typeof FETCH_USER_EXPENSES_CATEGORIES | typeof FETCH_USER_INCOMES_CATEGORIES;
  payload: ICategoryDocument[];
}

export type IFetchActions = IFetchUserAction | IFetchExpensesAction | IFetchIncomesAction | IFetchCategoriesAction;

export interface IFetchInitialState {
  readonly user: IUserDocument;
  readonly expenses: IExpenseDocument[];
  readonly expensesCategories: ICategoryDocument[];
  readonly incomes: IIncomeDocument[];
  readonly incomesCategories: ICategoryDocument[];
}

export interface IUnixTimestamp {
  seconds: number;
  nanoseconds: number;
}
