import { ICategoryDocument, IExpenseData, IIncomeData } from '../../../../models/fetch.interfaces';

export interface IActionOwnProps {
  type: 'addExpense' | 'addIncome' | null;
}

export interface IActionStateProps {
  categories: ICategoryDocument[];
}

interface IActionDispatchProps {
  addExpense: (data: IExpenseData) => void;
  addIncome: (data: IIncomeData) => void;
  toggleBottomSheet: (type: null) => void;
}

export type IActionProps = IActionOwnProps & IActionStateProps & IActionDispatchProps;

export interface IFormState {
  isCalendarOpen: boolean;
  calendar: string;
  name: string;
  logo: string | null;
  ammount: string;
}

export interface IChip extends ICategoryDocument {
  isSelected: boolean;
}

export interface IActionState {
  formState: IFormState;
  chips: IChip[];
}
