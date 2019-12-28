import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import styled from 'styled-components';

const StyledInputAdornment = styled(InputAdornment)`
  & > p {
    font-size: 24px !important;
  }
`;

interface IInputProps {
  value: string;
  name: 'name' | 'ammount';
  setInputValue: (name: 'name' | 'ammount', value: string) => void;
}

export const Input: React.FC<IInputProps> = ({ value, name, setInputValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => setInputValue(name, event.target.value);

  return (
    <TextField
      onChange={handleChange}
      value={value}
      InputProps={{
        style: { fontSize: 25 },
        ...(name === 'ammount'
          ? {
              startAdornment: <StyledInputAdornment position="start">£</StyledInputAdornment>
            }
          : {})
      }}
      color="secondary"
      fullWidth
    />
  );
};
