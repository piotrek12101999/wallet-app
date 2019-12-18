import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';

import { Categories } from './ExpensesCategories';
import { toggleBottomSheet } from '../../../../actions/uiActions';
import { addExpense, addIncome } from '../../../../actions/dbActions';
import { IAppState } from '../../../../models/store.interfaces';
import { ICategoryDocument } from '../../../../models/fetch.interfaces';
import { IActionProps, IActionState, IChip, IActionOwnProps, IActionStateProps } from './action.interface';
import { ExpenseForm } from './ActionsForm/ExpenseForm';
import { IncomeForm } from './ActionsForm/IncomeForm';

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
        name: '',
        logo: null,
        ammount: ''
      },
      chips: []
    };
  }

  UNSAFE_componentWillReceiveProps = ({ type, categories }: IActionProps): void => {
    if (type === null) {
      this.setState({
        isFocused: false,
        formState: {
          isCalendarOpen: false,
          calendar: moment().format('MM-DD-YYYY'),
          name: '',
          logo: null,
          ammount: ''
        },
        chips: []
      });
    } else {
      this.setState({
        chips: categories.map((category: ICategoryDocument) => ({ ...category, isSelected: false }))
      });
    }
  };

  setFocused = (isFocused: boolean): void => this.setState({ isFocused });

  setInputValue = (name: 'name' | 'ammount', value: string): void => {
    this.setState((prevState: IActionState) => ({
      formState: {
        ...prevState.formState,
        ...(name === 'name' ? { logo: null } : {}),
        [name]: value
      }
    }));
  };

  setLogoValue = (logo: string | null): void => {
    this.setState((prevState: IActionState) => ({
      formState: {
        ...prevState.formState,
        logo
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
      formState: { name, calendar, logo, ammount },
      chips
    } = this.state;

    const { type, addExpense, addIncome, toggleBottomSheet } = this.props;
    const data = {
      ammount: parseInt(ammount),
      date: new Date(calendar),
      categories: chips.filter(chip => chip.isSelected).map(chip => chip.name)
    };
    if (type === 'addIncome') {
      addIncome(data);
    } else if (type === 'addExpense') {
      addExpense({ ...data, name, logo });
    }
    toggleBottomSheet(null);
  };

  render() {
    const { isFocused, formState, chips } = this.state;
    const { type } = this.props;
    return (
      <Container isFormFocused={isFocused} bottomMarginHeight={type === 'addExpense' ? '216px' : '256px'}>
        {type === 'addExpense' ? (
          <ExpenseForm
            formState={formState}
            setFocused={this.setFocused}
            handleCalendarChange={this.handleCalendarChange}
            handleCalendarStateChange={this.handleCalendarStateChange}
            setInputValue={this.setInputValue}
            setLogoValue={this.setLogoValue}
          />
        ) : (
          <IncomeForm formState={formState} setFocused={this.setFocused} setInputValue={this.setInputValue} />
        )}
        <Categories toggleChipSelect={this.toggleChipSelect} chips={chips} />
        <Button onClick={this.handleSubmit} className="button" variant="contained">
          Add expense
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = ({ fetch }: IAppState, { type }: IActionOwnProps): IActionStateProps => ({
  categories: type === 'addExpense' ? fetch.expensesCategories : fetch.incomesCategories
});

export default connect(mapStateToProps, { addExpense, addIncome, toggleBottomSheet })(Action);
