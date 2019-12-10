import { batch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { auth, provider } from './actions';
import { fetchUserDoc, fetchCollectionsData } from './fetchActions';
import { SIGN_OUT, SIGN_IN, START_INITIALIZATION } from './types';
import { IAuthInitialState, IAuthActions } from '../models/auth.interfaces';
import { IAppState } from '../models/store.interfaces';

export const startListeningForAuthChanges = () => (
  dispatch: ThunkDispatch<IAppState, undefined, IAuthActions>
): void => {
  auth.onAuthStateChanged(async user => {
    dispatch({ type: START_INITIALIZATION });
    if (user) {
      const { uid, displayName, email, photoURL } = user;

      batch(() => {
        dispatch({ type: SIGN_IN, payload: { uid, displayName, email, photoURL } });
        dispatch(fetchUserDoc(uid));
        dispatch(fetchCollectionsData(uid));
      });
    } else {
      dispatch({ type: SIGN_OUT });
    }
  });
};

export const signIn = () => async (): Promise<void> => {
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

  await auth.signInWithPopup(provider);
};

export const signOut = () => async (
  dispatch: ThunkDispatch<IAuthInitialState, undefined, IAuthActions>
): Promise<void> => {
  await auth.signOut();
  dispatch({ type: SIGN_OUT });
};
