import { firestore } from './actions';
import { IFetchInitialState, IFetchActions, IUserDocument, IUnixTimestamp } from '../models/fetch.interfaces';
import {
  FETCH_USER_DOC,
  FETCH_USER_EXPENSES,
  FETCH_USER_INCOMES,
  FETCH_USER_EXPENSES_CATEGORIES,
  FETCH_USER_INCOMES_CATEGORIES
} from './types';
import { ThunkDispatch } from 'redux-thunk';

interface ICollectionToQuery {
  name: string;
  type:
    | typeof FETCH_USER_EXPENSES
    | typeof FETCH_USER_EXPENSES_CATEGORIES
    | typeof FETCH_USER_INCOMES
    | typeof FETCH_USER_INCOMES_CATEGORIES;
}

const collectionsToQuery: ICollectionToQuery[] = [
  { name: 'expenses', type: FETCH_USER_EXPENSES },
  { name: 'expenses_categories', type: FETCH_USER_EXPENSES_CATEGORIES },
  { name: 'incomes', type: FETCH_USER_INCOMES },
  { name: 'incomes_categories', type: FETCH_USER_INCOMES_CATEGORIES }
];

export const fetchUserDoc = (userID: string) => (
  dispatch: ThunkDispatch<IFetchInitialState, undefined, IFetchActions>
): void => {
  firestore.doc(`users/${userID}`).onSnapshot((snapshot: firebase.firestore.DocumentSnapshot) => {
    const documentData = snapshot.data() || { balance: 0 };
    const payload: IUserDocument = {
      id: snapshot.id,
      balance: documentData.balance
    };

    dispatch({ type: FETCH_USER_DOC, payload });
  });
};

const createCollectionQueryPrefix = (userID: string, collectionName: string): firebase.firestore.Query => {
  const prefix = firestore.collection(`users/${userID}/${collectionName}`);

  if (collectionName === 'expenses' || collectionName === 'expenses') {
    return prefix.orderBy('date', 'desc');
  }

  return prefix;
};

const transformUnixDates = (unixDate: IUnixTimestamp): Date => new Date(unixDate.seconds * 1000);

export const fetchCollectionsData = (userID: string) => (
  dispatch: ThunkDispatch<IFetchInitialState, undefined, IFetchActions>
) => {
  collectionsToQuery.forEach(({ name, type }) => {
    createCollectionQueryPrefix(userID, name).onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
      let payload = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (type === FETCH_USER_INCOMES || type === FETCH_USER_EXPENSES) {
        // @ts-ignore
        payload = payload.map(doc => ({ ...doc, date: transformUnixDates(doc.date) }));
      }

      // @ts-ignore
      dispatch({ type, payload });
    });
  });
};
