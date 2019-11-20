import { SET_THEME } from '../actions/types';
import { IUIInitialState, IUIActions } from '../models/ui.interfaces';

const recoverSavedState = (): boolean => {
  const darkTheme: string | null = window.localStorage.getItem('darkTheme');
  if (darkTheme !== null) {
    return darkTheme === 'true';
  }

  return false;
};

const INITIAL_STATE: IUIInitialState = {
  isDarkThemeEnabled: recoverSavedState()
};

export default (state = INITIAL_STATE, action: IUIActions): IUIInitialState => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, isDarkThemeEnabled: action.payload };
    default:
      return state;
  }
};
