import { SIGN_IN, SIGN_OUT, START_INITIALIZATION } from '../actions/types';

export interface IUser {
  uid: string;
  document_id: string;
  photoURL: string | null;
  email: string | null;
  displayName: string | null;
}

interface ISignInAction {
  type: typeof SIGN_IN;
  payload: IUser;
}

interface ISignOutAction {
  type: typeof SIGN_OUT;
}

interface IStartInitialization {
  type: typeof START_INITIALIZATION;
}

export type IAuthActions = ISignInAction | ISignOutAction | IStartInitialization;

export interface IAuthInitialState {
  isInitializing: boolean;
  isSignedIn: boolean;
  userData: IUser | null;
}
