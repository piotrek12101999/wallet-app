import React from 'react';

import { Label } from './FormComponents/Label';
import { Input } from './FormComponents/Input';
import { IFormState } from '../action.interface';

interface IExpenseFormProps {
  formState: IFormState;
  setInputValue: (name: 'name' | 'ammount', value: string) => void;
}

export const IncomeForm: React.FC<IExpenseFormProps> = ({ setInputValue, formState }) => (
  <>
    <Label text={'Ammount'} />
    <Input value={formState.ammount} setInputValue={setInputValue} name="ammount" />
  </>
);
