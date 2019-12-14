import React from 'react';
import { TextField } from '@material-ui/core';

interface IInputProps {
  value: string;
  name: 'incomeName' | 'ammount';
  setInputValue: (name: 'incomeName' | 'ammount', value: string) => void;
  setFocused: (isFocused: boolean) => void;
}

export const Input: React.FC<IInputProps> = ({ value, name, setInputValue, setFocused }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => setInputValue(name, event.target.value);

  const handleFormFocusChange = (isFocused: boolean): void => setFocused(isFocused);

  return (
    <TextField
      onChange={handleChange}
      value={value}
      InputProps={{ style: { fontSize: 25 } }}
      onFocus={() => handleFormFocusChange(true)}
      onBlur={() => handleFormFocusChange(false)}
      color="secondary"
      fullWidth
    />
  );
};
