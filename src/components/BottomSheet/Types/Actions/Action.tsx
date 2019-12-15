import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';

import { ActionForm } from './ActionsForm/ActionForm';
import { ExpensesCategories } from './ExpensesCategories';
import { IExpenseCategoryDocument, IExpenseDocument } from '../../../../models/fetch.interfaces';
import { addExpense } from '../../../../actions/dbActions';
import { IAppState } from '../../../../models/store.interfaces';
import { IActionProps, IActionState, IChip, IActionOwnProps, IActionStateProps } from './action.interface';

const Container = styled.div<{ isFormFocused: boolean; bottomMarginHeight: string }>`
  margin-bottom: ${props => (props.isFormFocused ? props.bottomMarginHeight : '0px')};
  transition: margin-bottom 0.2s ease-in;

  .button {
    border-radius: 16px;
    width: 100%;
  }
`;

class Action extends Component<IActionProps, IActionState> {
  constructor(props: IActionProps) {
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

  UNSAFE_componentWillReceiveProps = ({ type, expensesCategories }: IActionProps): void => {
    if (type === null) {
      this.setState({
        isFocused: false,
        formState: {
          isCalendarOpen: false,
          calendar: moment().format('MM-DD-YYYY'),
          incomeName: '',
          ammount: ''
        },
        chips: []
      });
    } else if (type === 'addExpense' && expensesCategories) {
      this.setState({
        chips: expensesCategories.map((expense: IExpenseCategoryDocument) => ({ ...expense, isSelected: false }))
      });
    }
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

  handleCalendarChange = <T extends unknown>(_: T, date: string | null | undefined): void => {
    if (date) {
      this.setState((prevState: IActionState) => ({
        formState: {
          ...prevState.formState,
          calendar: date
        }
      }));
    }
  };

  toggleChipSelect = (chipIndex: number): void => {
    this.setState((prevState: IActionState) => ({
      chips: prevState.chips.map((chip: IChip, index: number) => {
        if (chipIndex === index) {
          return { ...chip, isSelected: !chip.isSelected };
        }

        return chip;
      })
    }));
  };

  handleSubmit = (): void => {
    const {
      formState: { incomeName, ammount },
      chips
    } = this.state;
    const data: IExpenseDocument = {
      id: '2',
      name: incomeName,
      ammount: parseInt(ammount),
      date: new Date(),
      categories: chips.filter(chip => chip.isSelected).map(chips => chips.name)
    };

    this.props.addExpense(data);
  };

  render() {
    const { isFocused, formState, chips } = this.state;
    const { type } = this.props;
    console.log(this.props);
    return (
      <Container isFormFocused={isFocused} bottomMarginHeight={type === 'addExpense' ? '216px' : '256px'}>
        <ActionForm
          formState={formState}
          handleCalendarStateChange={this.handleCalendarStateChange}
          handleCalendarChange={this.handleCalendarChange}
          setInputValue={this.setInputValue}
          setFocused={this.setFocused}
        />
        {type === 'addExpense' && <ExpensesCategories toggleChipSelect={this.toggleChipSelect} chips={chips} />}
        <Button onClick={this.handleSubmit} className="button" variant="contained">
          Add expense
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = (state: IAppState, { type }: IActionOwnProps): IActionStateProps => ({
  ...(type === 'addExpense' ? { expensesCategories: state.fetch.expensesCategories } : {})
});

export default connect(mapStateToProps, { addExpense })(Action);
