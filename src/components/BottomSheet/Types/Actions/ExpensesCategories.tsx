import React from 'react';
import styled from 'styled-components';
import { Chip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { IChip } from './action.interface';

const ChipsContainer = styled.div`
  p {
    padding-top: 8px;
    font-size: 14px;
    margin: 0;
    margin-bottom: 4px;
    color: gray;
  }

  div {
    margin: 3px;
  }
`;

interface ICategoriesProps {
  chips: IChip[];
  toggleChipSelect: (chipIndex: number) => void;
}

export const Categories: React.FC<ICategoriesProps> = ({ chips, toggleChipSelect }) => {
  const renderChips = () =>
    chips.map(({ id, name, isSelected }: IChip, index: number) => (
      <Chip onClick={() => toggleChipSelect(index)} color={isSelected ? 'primary' : 'default'} key={id} label={name} />
    ));

  return (
    <ChipsContainer>
      <p> Choose a collection </p>
      {renderChips()}
      <Chip label={'New'} icon={<Add />} />
    </ChipsContainer>
  );
};
