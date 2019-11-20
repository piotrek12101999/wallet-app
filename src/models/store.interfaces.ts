import { IAuthInitialState } from './auth.interfaces';
import { IUIInitialState } from './ui.interfaces';

export interface IAppState {
  auth: IAuthInitialState;
  ui: IUIInitialState;
}
