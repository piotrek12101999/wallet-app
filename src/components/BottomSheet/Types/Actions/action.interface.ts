import { IExpenseDocument, IExpenseCategoryDocument } from '../../../../models/fetch.interfaces';

export interface IActionOwnProps {
  type: 'addExpense' | 'addIncome' | null;
}

export interface IActionStateProps {
  expensesCategories?: IExpenseCategoryDocument[];
}

interface IActionDispatchProps {
  addExpense: (data: IExpenseDocument) => void;
}

export type IActionProps = IActionOwnProps & IActionStateProps & IActionDispatchProps;

export interface IFormState {
  isCalendarOpen: boolean;
  calendar: string;
  incomeName: string;
  ammount: string;
}

export interface IChip extends IExpenseCategoryDocument {
  isSelected: boolean;
}

export interface IActionState {
  isFocused: boolean;
  formState: IFormState;
  chips: IChip[];
}
