import React from 'react';

import { Label } from './FormComponents/Label';
import { Input } from './FormComponents/Input';
import { IFormState } from '../action.interface';

interface IExpenseFormProps {
  formState: IFormState;
  setFocused: (isFocused: boolean) => void;
  setInputValue: (name: 'name' | 'ammount', value: string) => void;
}

export const IncomeForm: React.FC<IExpenseFormProps> = ({ setFocused, setInputValue, formState }) => (
  <>
    <Label text={'Ammount'} />
    <Input value={formState.ammount} setFocused={setFocused} setInputValue={setInputValue} name="ammount" />
  </>
);
