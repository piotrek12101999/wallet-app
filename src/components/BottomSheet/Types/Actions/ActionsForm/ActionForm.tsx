import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { Label } from './Label';
import { Input } from './Input';
import { IFormState } from '../Action';

interface IActionFormProps {
  formState: IFormState;
  setFocused: (isFocused: boolean) => void;
  handleCalendarChange: <T extends unknown>(_: T, date: string | null | undefined) => void;
  handleCalendarStateChange: (isOpened: boolean) => void;
  setInputValue: (name: 'incomeName' | 'ammount', value: string) => void;
}

export const ActionForm: React.FC<IActionFormProps> = ({
  setFocused,
  setInputValue,
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
    <Input value={formState.incomeName} setFocused={setFocused} setInputValue={setInputValue} name="incomeName" />
    <Label text={'Ammount'} />
    <Input value={formState.ammount} setFocused={setFocused} setInputValue={setInputValue} name="ammount" />
  </>
);
