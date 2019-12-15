import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledAutoSuggest = styled.div<{ isIncomeNameSet: boolean }>`
  p {
    padding-top: 3px;
    font-size: 16px;
    margin: 0;
    color: gray;
    height: 0;
    opacity: ${props => (props.isIncomeNameSet ? 1 : 0)};
    visibility: ${props => (props.isIncomeNameSet ? 'unset' : 'none')};
    transition: all 0.2s ease-in-out;
    margin-bottom: ${props => (props.isIncomeNameSet ? '25px' : 'unset')};
  }
`;

interface IAutoSuggestProps {
  incomeName: string;
  setInputValue: (name: 'incomeName' | 'ammount', value: string) => void;
}

export const AutoSuggest: React.FC<IAutoSuggestProps> = ({ incomeName, setInputValue }) => {
  const [suggest, setSuggest] = useState<string>('');

  axios
    .get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=:${incomeName}`)
    .then(({ data }) => setSuggest(data[0] ? (data[0].domain === 'tes.com' ? data[1].name : data[0].name) : ''));

  const handleSugestionSet = (): void => setInputValue('incomeName', suggest);

  return (
    <StyledAutoSuggest onClick={handleSugestionSet} isIncomeNameSet={incomeName.length > 0 && incomeName !== suggest}>
      <p> Did you mean {suggest}?</p>
    </StyledAutoSuggest>
  );
};
