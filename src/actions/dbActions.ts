import { firestore } from './actions';
import { IAppState } from '../models/store.interfaces';
import { IExpenseData, IIncomeData } from '../models/fetch.interfaces';
import { ThunkDispatch } from 'redux-thunk';
import { IUIActions, IUIInitialState } from '../models/ui.interfaces';
import { addItemToCollectionInFirestore, updateBalance } from './sharedFunctions';

export const addExpenseCategory = (data: any) => async (dispatch: any, getState: () => IAppState) => {
  const {
    auth: { userData }
  } = getState();

  if (userData) {
    await firestore.collection(`/users/${userData.uid}/expenses_categories`).add(data);
  }
};

export const addExpense = (data: IExpenseData) => async (
  dispatch: ThunkDispatch<IUIInitialState, undefined, IUIActions>,
  getState: () => IAppState
): Promise<void> => {
  const {
    auth: { userData }
  } = getState();

  if (userData) {
    updateBalance(userData.uid, -data.ammount);
    addItemToCollectionInFirestore('expenses', userData.uid, data, dispatch, 'Expense has been added 💸');
  }
};

export const addIncome = (data: IIncomeData) => async (
  dispatch: ThunkDispatch<IUIActions, undefined, IUIActions>,
  getState: () => IAppState
): Promise<void> => {
  const {
    auth: { userData }
  } = getState();

  if (userData) {
    updateBalance(userData.uid, data.ammount);
    addItemToCollectionInFirestore('incomes', userData.uid, data, dispatch, 'Income has been added 💸');
  }
};
