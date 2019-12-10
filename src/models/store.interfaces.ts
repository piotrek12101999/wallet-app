import { IAuthInitialState } from './auth.interfaces';
import { IUIInitialState } from './ui.interfaces';
import { IFetchInitialState } from './fetch.interfaces';

export interface IAppState {
  auth: IAuthInitialState;
  ui: IUIInitialState;
  fetch: IFetchInitialState;
}
