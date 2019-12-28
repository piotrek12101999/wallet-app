import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TouchCarousel from 'react-touch-carousel';
import { CarouselContainer, cardSize } from './CarouselContainer/CarouselContainer';
import { IAppState } from '../../../models/store.interfaces';
import { CarouselCard } from './CarouselCard';
import { IExpenseDocument } from '../../../models/fetch.interfaces';

const StyledCard = styled.div`
  height: 100%;
  margin-top: 16px;
  -webkit-tap-highlight-color: transparent;

  .expense-container {
    width: 350.5px;
    margin-bottom: 16px;
  }
`;

function calculateDateFromNow(numberOfDaysToCalculate: number): Date {
  const date: Date = new Date();
  return new Date(date.setDate(date.getDate() - numberOfDaysToCalculate));
}

function calculateExpenses(expensesArray: IExpenseDocument[], dateRange: Date): number {
  return expensesArray
    .filter(expense => expense.date >= dateRange)
    .reduce((accumulator, expense) => accumulator + expense.ammount, 0);
}

interface IExpenseCarouselProps {
  expenses: IExpenseDocument[];
  balance: number;
}

export interface IDateStats {
  name: 'Today' | 'Week' | 'Month';
  expense: number;
  balance: number;
}
interface IExpenseCarouselState {
  dayToWeek: null | IDateStats;
  dayToMonth: null | IDateStats;
  weekToMonth: null | IDateStats;
}

const ExpensesCarousel: React.FC<IExpenseCarouselProps> = ({ expenses, balance }) => {
  const [carouselState, setCarouselState] = useState<IExpenseCarouselState>({
    dayToWeek: null,
    dayToMonth: null,
    weekToMonth: null
  });

  useEffect(() => {
    const date: Date = new Date();
    const lastWeekDate: Date = calculateDateFromNow(7);
    const lastMonthDate: Date = calculateDateFromNow(date.getDate());
    const thisDayExpenses: number = calculateExpenses(expenses, new Date(date.setHours(0, 0, 0)));
    const thisWeekExpenses: number = calculateExpenses(expenses, lastWeekDate);
    const thisMonthExpenses: number = calculateExpenses(expenses, lastMonthDate);
    setCarouselState(prevState => ({
      ...prevState,
      dayToWeek: {
        name: 'Today',
        expense: thisDayExpenses,
        balance: balance + thisDayExpenses
      },
      dayToMonth: {
        name: 'Week',
        expense: thisWeekExpenses,
        balance: balance + thisWeekExpenses
      },
      weekToMonth: {
        name: 'Today',
        expense: thisWeekExpenses,
        balance: balance + thisMonthExpenses
      }
    }));
  }, [expenses, balance]);

  const renderCard = (index: number): JSX.Element => {
    const names = ['Today', 'Week', 'Month'];
    const data =
      index === 0 ? carouselState.dayToWeek : index === 1 ? carouselState.weekToMonth : carouselState.dayToMonth;
    return (
      <StyledCard key={index}>
        <div className="expense-container">
          <CarouselCard name={names[index]} cardData={data} />
        </div>
      </StyledCard>
    );
  };

  return (
    <TouchCarousel
      component={CarouselContainer}
      cardSize={cardSize}
      cardCount={3}
      cardPadCount={0}
      renderCard={renderCard}
      loop={false}
    />
  );
};

const mapStateToProps = (state: IAppState) => ({
  expenses: state.fetch.expenses,
  balance: state.fetch.user.balance
});

export default connect(mapStateToProps, {})(ExpensesCarousel);
