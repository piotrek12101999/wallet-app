import React from 'react';
import styled from 'styled-components';
import { Chip } from '@material-ui/core';
import { CalendarTodayRounded } from '@material-ui/icons';
import moment from 'moment';
import { IFormState } from '../../action.interface';

interface ILabelProps {
  text: string;
  handleCalendarStateChange?: (isOpened: boolean) => void;
  formState?: IFormState;
  includesCalendar?: boolean;
}

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > p {
    padding-top: 8px;
    font-size: 14px;
    margin: 0;
    color: gray;
  }
`;

export const Label: React.FC<ILabelProps> = ({
  text,
  includesCalendar = false,
  formState,
  handleCalendarStateChange
}) => {
  const setLabel = () => {
    if (formState) {
      const { calendar } = formState;
      if (calendar === moment().format('MM-DD-YYYY')) {
        return 'Today';
      }

      return moment(calendar, 'MM-DD-YYYY').format('ddd, Do MMM');
    }
  };

  const handleCalendarOpen = (): void => {
    if (handleCalendarStateChange) {
      handleCalendarStateChange(true);
    }
  };

  return (
    <LabelContainer>
      <p> {text} </p>
      {includesCalendar && (
        <Chip
          onClick={handleCalendarOpen}
          icon={<CalendarTodayRounded style={{ fontSize: 15 }} fontSize="small" />}
          style={{ padding: 5, background: 'rgba(0,0,0,.075)' }}
          label={setLabel() || 'not defined'}
        />
      )}
    </LabelContainer>
  );
};
