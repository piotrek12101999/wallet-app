import { auth, provider } from './actions';
import { SIGN_OUT, SIGN_IN, START_INITIALIZATION } from './types';
import { IAuthInitialState, IAuthActions } from '../models/auth.interfaces';
import { ThunkDispatch } from 'redux-thunk';

export const startListeningForAuthChanges = () => (
  dispatch: ThunkDispatch<IAuthInitialState, undefined, IAuthActions>
): void => {
  auth.onAuthStateChanged(async user => {
    dispatch({ type: START_INITIALIZATION });
    if (user) {
      const { uid, displayName, email, photoURL } = user;

      dispatch({ type: SIGN_IN, payload: { uid, document_id: 's', displayName, email, photoURL } });
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
