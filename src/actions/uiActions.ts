import { SET_THEME, TOGGLE_BOTTOM_SHEET, TOGGLE_SNACKBAR } from './types';
import { IUIActions, ISnackbarState } from '../models/ui.interfaces';

export const toggleTheme = (isDarkThemeEnabled: boolean): IUIActions => {
  window.localStorage.setItem('darkTheme', String(isDarkThemeEnabled));

  return {
    type: SET_THEME,
    payload: isDarkThemeEnabled
  };
};

export const toggleBottomSheet = (type: 'addIncome' | 'addExpense' | null): IUIActions => ({
  type: TOGGLE_BOTTOM_SHEET,
  payload: {
    open: !!type,
    type
  }
});

export const toggleSnackbar = (payload: ISnackbarState): IUIActions => ({
  type: TOGGLE_SNACKBAR,
  payload
});
