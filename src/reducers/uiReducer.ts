import { SET_THEME, TOGGLE_BOTTOM_SHEET, TOGGLE_SNACKBAR } from '../actions/types';
import { IUIInitialState, IUIActions } from '../models/ui.interfaces';

const recoverSavedState = (): boolean => {
  const darkTheme: string | null = window.localStorage.getItem('darkTheme');
  if (darkTheme !== null) {
    return darkTheme === 'true';
  }

  return false;
};

const INITIAL_STATE: IUIInitialState = {
  isDarkThemeEnabled: recoverSavedState(),
  bottomSheetState: {
    open: false,
    type: null
  },
  snackbarState: {
    type: null,
    message: ''
  }
};

export default (state = INITIAL_STATE, action: IUIActions): IUIInitialState => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, isDarkThemeEnabled: action.payload };
    case TOGGLE_BOTTOM_SHEET:
      return { ...state, bottomSheetState: action.payload };
    case TOGGLE_SNACKBAR:
      return { ...state, snackbarState: { type: action.payload.type, message: action.payload.message } };
    default:
      return state;
  }
};
