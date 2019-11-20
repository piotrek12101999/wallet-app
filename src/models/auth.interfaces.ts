import { SIGN_IN, SIGN_OUT } from '../actions/types';

interface IUser {
  uid: string;
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

export type IAuthActions = ISignInAction | ISignOutAction;

export interface IAuthInitialState {
  isSignedIn: boolean;
  userData: IUser | null;
}
