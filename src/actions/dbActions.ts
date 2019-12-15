import { firestore } from './actions';
import { IAppState } from '../models/store.interfaces';
import { IExpenseDocument } from '../models/fetch.interfaces';
import { ThunkDispatch } from 'redux-thunk';
import { IUIActions } from '../models/ui.interfaces';
import { TOGGLE_SNACKBAR } from './types';

export const addExpenseCategory = (data: any) => async (dispatch: any, getState: () => IAppState) => {
  const {
    auth: { userData }
  } = getState();

  if (userData) {
    await firestore.collection(`/users/${userData.uid}/expenses_categories`).add(data);
  }
};

export const addExpense = (data: IExpenseDocument) => async (
  dispatch: ThunkDispatch<IUIActions, undefined, IUIActions>,
  getState: () => IAppState
): Promise<void> => {
  const {
    auth: { userData }
  } = getState();

  if (userData) {
    try {
      await firestore.collection(`/users/${userData.uid}/expenses`).add(data);
      dispatch({ type: TOGGLE_SNACKBAR, payload: { type: 'success', message: 'Expense has been added 💸' } });
    } catch (error) {
      dispatch({ type: TOGGLE_SNACKBAR, payload: { type: 'error', message: 'Sorry there was a problem 😔' } });
    }
  }
};
