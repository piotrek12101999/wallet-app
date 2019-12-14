import { SET_THEME, TOGGLE_BOTTOM_SHEET } from './types';
import { IUIActions } from '../models/ui.interfaces';

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
