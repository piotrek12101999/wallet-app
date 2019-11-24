import { auth, provider } from './actions';
import { SIGN_OUT, SIGN_IN, START_INITIALIZATION } from './types';
import { IAuthInitialState, IAuthActions } from '../models/auth.interfaces';
import { ThunkDispatch } from 'redux-thunk';

export const startListeningForAuthChanges = () => (
  dispatch: ThunkDispatch<IAuthInitialState, undefined, IAuthActions>
): void => {
  auth.onAuthStateChanged(user => {
    dispatch({ type: START_INITIALIZATION });
    if (user) {
      const { uid, displayName, email, photoURL } = user;

      dispatch({ type: SIGN_IN, payload: { uid, displayName, email, photoURL } });
    } else {
      dispatch({ type: SIGN_OUT });
    }
  });
};

export const signIn = () => async (
  dispatch: ThunkDispatch<IAuthInitialState, undefined, IAuthActions>
): Promise<void> => {
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

  const { user } = await auth.signInWithPopup(provider);
  if (user) {
    const { uid, displayName, email, photoURL } = user;

    dispatch({ type: SIGN_IN, payload: { uid, displayName, email, photoURL } });
  }
};

export const signOut = () => async (dispatch: ThunkDispatch<IAuthInitialState, undefined, IAuthActions>) => {
  await auth.signOut();
  dispatch({ type: SIGN_OUT });
};
