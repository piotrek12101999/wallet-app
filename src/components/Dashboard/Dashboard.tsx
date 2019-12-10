import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

import TopNavigation from './TopNavigation/TopNavigation';
import AccountStatus from './AccountStatus/AccountStatus';
import { PaymentActions } from './PaymentActions/PaymentActions';
import { ExpensesCarousel } from './ExpensesCarousel/ExpensesCarousel';
import { Transactions } from './Transactions/Transactions';

const StyledContainer = styled(Container)`
  background: ${({ theme }) => theme.backgroundOnPrimaryColor};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  & > div {
    border-radius: ${({ theme }) => `${theme.borderRadius}px`};
  }
`;

const TransactionsContainer = styled(Container)`
  background: ${({ theme }) => theme.background};
  margin-bottom: 56px !important;

  & > .title {
    font-size: 19px;
    font-weight: 600;
    margin: unset;
    color: ${({ theme }) => theme.fontColor};
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
      </StyledContainer>
      <ExpensesCarousel />
      <TransactionsContainer>
        <p className="title"> Last transactions </p>
        <Transactions />
      </TransactionsContainer>
    </>
  );
};
