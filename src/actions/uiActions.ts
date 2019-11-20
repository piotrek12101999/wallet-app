import { SET_THEME } from './types';
import { IUIActions } from '../models/ui.interfaces';

export const toggleTheme = (isLightThemeEnabled: boolean): IUIActions => ({
  type: SET_THEME,
  payload: isLightThemeEnabled
});
