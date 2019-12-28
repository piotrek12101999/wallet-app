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
    margin-top: 12px;
    margin-bottom: 8px;
    color: gray;
  }

  div {
    margin: 3px;
  }

  & > .selected {
    background: #1dc5d3 !important;
    color: white;
  }
`;

interface ICategoriesProps {
  chips: IChip[];
  toggleChipSelect: (chipIndex: number) => void;
}

export const Categories: React.FC<ICategoriesProps> = ({ chips, toggleChipSelect }) => {
  const renderChips = () =>
    chips.map(({ id, name, isSelected }: IChip, index: number) => (
      <Chip onClick={() => toggleChipSelect(index)} className={isSelected ? 'selected' : ''} key={id} label={name} />
    ));

  return (
    <ChipsContainer>
      <p> Choose a collection </p>
      {renderChips()}
      <Chip label={'New'} icon={<Add />} />
    </ChipsContainer>
  );
};
