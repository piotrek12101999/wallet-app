import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { Label } from './FormComponents/Label';
import { Input } from './FormComponents/Input';
import { AutoSuggest } from './FormComponents/AutoSuggest';
import { IFormState } from '../action.interface';

interface IExpenseFormProps {
  formState: IFormState;
  handleCalendarChange: <T extends unknown>(_: T, date: string | null | undefined) => void;
  handleCalendarStateChange: (isOpened: boolean) => void;
  setInputValue: (name: 'name' | 'ammount', value: string) => void;
  setLogoValue: (logo: string | null) => void;
}

export const ExpenseForm: React.FC<IExpenseFormProps> = ({
  setInputValue,
  setLogoValue,
  formState,
  handleCalendarStateChange,
  handleCalendarChange
}) => (
  <>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        color="secondary"
        style={{ visibility: 'hidden' }}
        onClose={() => handleCalendarStateChange(false)}
        open={formState.isCalendarOpen}
        value={new Date(formState.calendar)}
        format={'MM-DD-YYYY'}
        onChange={handleCalendarChange}
      />
    </MuiPickersUtilsProvider>
    <Label
      text={'Add income'}
      formState={formState}
      handleCalendarStateChange={handleCalendarStateChange}
      includesCalendar
    />
    <Input value={formState.name} setInputValue={setInputValue} name="name" />
    <AutoSuggest name={formState.name} setLogoValue={setLogoValue} setInputValue={setInputValue} />
    <Label text={'Ammount'} />
    <Input value={formState.ammount} setInputValue={setInputValue} name="ammount" />
  </>
);
