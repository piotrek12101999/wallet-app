import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { ActionForm } from './ActionsForm/ActionForm';
import { ExpensesCategories } from './ExpensesCategories';

const Container = styled.div<{ isFormFocused: boolean }>`
  margin-bottom: ${props => (props.isFormFocused ? '216px' : '0px')};
  transition: margin-bottom 0.2s ease-in;
`;

export interface IFormState {
  isCalendarOpen: boolean;
  calendar: string;
  incomeName: string;
  ammount: string;
}

interface IActionState {
  isFocused: boolean;
  formState: IFormState;
  chips: any[];
}

export class Action extends Component<{}, IActionState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isFocused: false,
      formState: {
        isCalendarOpen: false,
        calendar: moment().format('MM-DD-YYYY'),
        incomeName: '',
        ammount: ''
      },
      chips: []
    };
  }

  componentDidMount = () => {
    console.log('mounted');
  };

  setFocused = (isFocused: boolean): void => this.setState({ isFocused });

  setInputValue = (name: 'incomeName' | 'ammount', value: string): void => {
    this.setState((prevState: IActionState) => ({
      formState: {
        ...prevState.formState,
        [name]: value
      }
    }));
  };

  handleCalendarStateChange = (isCalendarOpen: boolean): void => {
    this.setState((prevState: IActionState) => ({
      formState: {
        ...prevState.formState,
        isCalendarOpen
      }
    }));
  };

  handleCalendarChange = <T extends unknown>(_: T, date: string | null | undefined) => {
    if (date) {
      this.setState((prevState: IActionState) => ({
        formState: {
          ...prevState.formState,
          calendar: date
        }
      }));
    }
  };

  render() {
    const { isFocused, formState } = this.state;
    return (
      <Container isFormFocused={isFocused}>
        <ActionForm
          formState={formState}
          handleCalendarStateChange={this.handleCalendarStateChange}
          handleCalendarChange={this.handleCalendarChange}
          setInputValue={this.setInputValue}
          setFocused={this.setFocused}
        />
        <ExpensesCategories />
      </Container>
    );
  }
}
