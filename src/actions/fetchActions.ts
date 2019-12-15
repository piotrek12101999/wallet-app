import { firestore } from './actions';
import { IFetchInitialState, IFetchActions, IUserDocument } from '../models/fetch.interfaces';
import { FETCH_USER_DOC, FETCH_USER_EXPENSES, FETCH_USER_INCOMES, FETCH_USER_EXPENSES_CATEGORIES } from './types';
import { ThunkDispatch } from 'redux-thunk';

interface ICollectionToQuery {
  name: string;
  type: typeof FETCH_USER_EXPENSES | typeof FETCH_USER_EXPENSES_CATEGORIES | typeof FETCH_USER_INCOMES;
}

const collectionsToQuery: ICollectionToQuery[] = [
  { name: 'expenses', type: FETCH_USER_EXPENSES },
  { name: 'incomes', type: FETCH_USER_INCOMES },
  { name: 'expenses_categories', type: FETCH_USER_EXPENSES_CATEGORIES }
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

const createCollectionQueryPrefix = (userID: string, collectionName: string): firebase.firestore.CollectionReference =>
  firestore.collection(`users/${userID}/${collectionName}`);

export const fetchCollectionsData = (userID: string) => (
  dispatch: ThunkDispatch<IFetchInitialState, undefined, IFetchActions>
) => {
  collectionsToQuery.forEach(({ name, type }) => {
    createCollectionQueryPrefix(userID, name).onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
      const payload = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // @ts-ignore
      dispatch({ type, payload });
    });
  });
};
