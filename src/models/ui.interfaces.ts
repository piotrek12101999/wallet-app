import { SET_THEME, TOGGLE_BOTTOM_SHEET, TOGGLE_SNACKBAR } from '../actions/types';

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

export interface ISnackbarState {
  type: 'success' | 'error' | null;
  message: string;
}

interface IToggleSnackbar {
  type: typeof TOGGLE_SNACKBAR;
  payload: ISnackbarState;
}

export type IUIActions = ISetThemeAction | IToggleBottomSheetAction | IToggleSnackbar;

export interface IUIInitialState {
  readonly isDarkThemeEnabled: boolean;
  readonly bottomSheetState: IBottomSheetState;
  readonly snackbarState: ISnackbarState;
}
