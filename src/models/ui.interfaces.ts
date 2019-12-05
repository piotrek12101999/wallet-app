import { SET_THEME } from '../actions/types';

interface IGlobalSettingTheme {
  borderRadius: number;
  fontFamily: string;
}

interface ITheme {
  background: string;
  primaryColor: string;
  navColor: string;
  gridColor: string;
  backgroundOnPrimaryColor: string;
  secondaryColor: string;
  fontColor: string;
  secondaryFontColor: string;
}

export interface IThemes {
  global: IGlobalSettingTheme;
  light: ITheme;
  dark: ITheme;
}

interface ISetThemeAction {
  type: typeof SET_THEME;
  payload: boolean;
}

export type IUIActions = ISetThemeAction;

export interface IUIInitialState {
  isDarkThemeEnabled: boolean;
}
