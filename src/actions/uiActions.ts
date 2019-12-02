import { SET_THEME } from './types';
import { IUIActions } from '../models/ui.interfaces';

export const toggleTheme = (isDarkThemeEnabled: boolean): IUIActions => {
  window.localStorage.setItem('darkTheme', String(isDarkThemeEnabled));

  return {
    type: SET_THEME,
    payload: isDarkThemeEnabled
  };
};
