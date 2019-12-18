import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledAutoSuggest = styled.div<{ isNameSet: boolean }>`
  p {
    padding-top: 3px;
    font-size: 16px;
    margin: 0;
    color: gray;
    height: 0;
    opacity: ${props => (props.isNameSet ? 1 : 0)};
    visibility: ${props => (props.isNameSet ? 'unset' : 'none')};
    transition: all 0.2s ease-in-out;
    margin-bottom: ${props => (props.isNameSet ? '25px' : 'unset')};
  }
`;

interface IAutoSuggestProps {
  name: string;
  setInputValue: (name: 'name' | 'ammount', value: string) => void;
  setLogoValue: (logo: string | null) => void;
}

interface ISuggestState {
  name: string;
  logo: string | null;
}

interface IApiDataStructure {
  name: string;
  domain: string;
  logo: string;
}

function usePrevious(value: string): string {
  const ref: React.MutableRefObject<string | undefined> = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current || '';
}

export const AutoSuggest: React.FC<IAutoSuggestProps> = ({ name, setInputValue, setLogoValue }) => {
  const [suggest, setSuggest] = useState<ISuggestState>({ name: '', logo: null });
  const prevName: string = usePrevious(name);

  useEffect(() => {
    if (name !== prevName) {
      axios
        .get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=:${name}`)
        .then(({ data }: { data: IApiDataStructure[] }) => {
          const dataExists: boolean = !!data[0];

          if (dataExists) {
            const index: number = data[0].domain === 'tes.com' ? 1 : 0;

            setSuggest({ name: data[index].name, logo: data[index].logo });
          }
        })
        .catch(() => setSuggest({ name: 'error', logo: null }));
    }
  }, [name, prevName]);

  const handleSugestionSet = (): void => {
    const { name, logo } = suggest;
    setInputValue('name', name);
    setLogoValue(logo);
  };

  return (
    <StyledAutoSuggest onClick={handleSugestionSet} isNameSet={name.length > 0 && name !== suggest.name}>
      <p> Did you mean {suggest.name}?</p>
    </StyledAutoSuggest>
  );
};
