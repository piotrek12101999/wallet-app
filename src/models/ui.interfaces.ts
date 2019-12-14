import { SET_THEME, TOGGLE_BOTTOM_SHEET } from '../actions/types';

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

export interface IBottomSheetState {
  open: boolean;
  type: 'addIncome' | 'addExpense' | null;
}

interface IToggleBottomSheetAction {
  type: typeof TOGGLE_BOTTOM_SHEET;
  payload: IBottomSheetState;
}

export type IUIActions = ISetThemeAction | IToggleBottomSheetAction;

export interface IUIInitialState {
  readonly isDarkThemeEnabled: boolean;
  readonly bottomSheetState: IBottomSheetState;
}
