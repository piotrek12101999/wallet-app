import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

import TopNavigation from './TopNavigation/TopNavigation';
import { AccountStatus } from './AccountStatus/AccountStatus';
import { PaymentActions } from './PaymentActions/PaymentActions';
import { ExpensesCarousel } from './ExpensesCarousel/ExpensesCarousel';
import { Transactions } from './Transactions/Transactions';

const StyledContainer = styled(Container)`
  background: ${({ theme }) => theme.primaryColor};
`;

const TransactionsContainer = styled(Container)`
  padding-top: 60px;
  background: #f8f9f9;

  & > .title {
    font-size: 19px;
    font-weight: 600;
    margin: unset;
    color: #1f3077;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  & > div {
    border-radius: ${({ theme }) => `${theme.borderRadius}px`};
  }
`;

export const Dashboard: React.FC = () => {
  return (
    <>
      <StyledContainer>
        <TopNavigation />
        <GridContainer>
          <AccountStatus />
          <PaymentActions actionType="addExpense" />
          <PaymentActions actionType="addIncome" />
        </GridContainer>
        <ExpensesCarousel />
      </StyledContainer>
      <TransactionsContainer>
        <p className="title"> Last transactions </p>
        <Transactions />
      </TransactionsContainer>
    </>
  );
};
