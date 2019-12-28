import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const Container = styled.div`
  .button {
    border-radius: 24px;
    padding: 10px;
    width: 100%;
    font-size: 16px;
    margin-top: 24px;
    margin-bottom: 12px;
    background: rgba(0, 0, 0, 0.075);
    border: solid 1px rgba(0, 0, 0, 0.075);
  }
`;

class Action extends Component<IActionProps, IActionState> {
  constructor(props: IActionProps) {
    super(props);
    this.state = {
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

    const date: Date = calendar === moment().format('MM-DD-YYYY') ? new Date() : new Date(calendar);

    const data = {
      ammount: parseFloat(ammount),
      date,
      categories: chips.filter(chip => chip.isSelected).map(chip => chip.name)
    };

    if (type === 'addIncome') {
      addIncome(data);
    } else if (type === 'addExpense') {
      addExpense({
        ...data,
        name,
        ...(logo ? { logo } : {})
      });
    }
    toggleBottomSheet(null);
  };

  render() {
    const { formState, chips } = this.state;
    const { type } = this.props;
    return (
      <Container>
        {type === 'addIncome' ? (
          <IncomeForm formState={formState} setInputValue={this.setInputValue} />
        ) : (
          <ExpenseForm
            formState={formState}
            handleCalendarChange={this.handleCalendarChange}
            handleCalendarStateChange={this.handleCalendarStateChange}
            setInputValue={this.setInputValue}
            setLogoValue={this.setLogoValue}
          />
        )}
        <Categories toggleChipSelect={this.toggleChipSelect} chips={chips} />
        <button onClick={this.handleSubmit} className="button">
          {type === 'addExpense' ? 'Add expense' : 'Add income'}
        </button>
      </Container>
    );
  }
}

const mapStateToProps = ({ fetch }: IAppState, { type }: IActionOwnProps): IActionStateProps => ({
  categories: type === 'addExpense' ? fetch.expensesCategories : fetch.incomesCategories
});

export default connect(mapStateToProps, { addExpense, addIncome, toggleBottomSheet })(Action);
