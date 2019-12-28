import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestore } from './actions';
import { ThunkDispatch } from 'redux-thunk';
import { IUIInitialState, IUIActions } from '../models/ui.interfaces';
import { TOGGLE_SNACKBAR } from './types';

export const updateBalance = async (uid: string, ammount: number) => {
  try {
    const balance = firebase.firestore.FieldValue.increment(ammount);
    await firestore.doc(`users/${uid}`).update({
      balance
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const addItemToCollectionInFirestore = async <T>(
  collectionName: string,
  uid: string,
  data: T,
  dispatch: ThunkDispatch<IUIInitialState, undefined, IUIActions>,
  message: string
): Promise<void> => {
  try {
    await firestore.collection(`/users/${uid}/${collectionName}`).add(data);
    dispatch({ type: TOGGLE_SNACKBAR, payload: { type: 'success', message } });
  } catch (error) {
    dispatch({ type: TOGGLE_SNACKBAR, payload: { type: 'error', message } });
  }
};
