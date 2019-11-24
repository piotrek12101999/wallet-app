import { SIGN_IN, SIGN_OUT, START_INITIALIZATION } from '../actions/types';
import { IAuthInitialState, IAuthActions } from '../models/auth.interfaces';

const INITIAL_STATE: IAuthInitialState = {
  isInitializing: true,
  isSignedIn: false,
  userData: null
};

export default (state = INITIAL_STATE, action: IAuthActions): IAuthInitialState => {
  switch (action.type) {
    case START_INITIALIZATION:
      return { ...state, isInitializing: true };
    case SIGN_IN:
      return { ...state, isInitializing: false, isSignedIn: true, userData: action.payload };
    case SIGN_OUT:
      return { ...state, isInitializing: false, isSignedIn: false, userData: null };
    default:
      return state;
  }
};
