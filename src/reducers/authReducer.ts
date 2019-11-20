import { SIGN_IN, SIGN_OUT } from '../actions/types';
import { IAuthInitialState, IAuthActions } from '../models/auth.interfaces';

const INITIAL_STATE: IAuthInitialState = {
  isSignedIn: false,
  userData: null
};

export default (state = INITIAL_STATE, action: IAuthActions): IAuthInitialState => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userData: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userData: null };
    default:
      return state;
  }
};
