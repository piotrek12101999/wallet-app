import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Transaction } from './Transaction';
import { EmptyList } from './EmptyList';
import { IAppState } from '../../../models/store.interfaces';

const TransactionsContainer = styled.table`
  width: 100%;
  border-spacing: 0 1em;
`;

export interface ITransaction {
  type: string;
  id: string;
  ammount: number;
  date: Date;
  categories: string[];
  name?: string;
  logo?: string;
}

interface ITransactionsProps {
  transactions: ITransaction[];
}

const Transactions: React.FC<ITransactionsProps> = ({ transactions }) => {
  return (
    <>
      {transactions.length > 0 ? (
        <TransactionsContainer>
          <tbody>
            {transactions.map(transaction => (
              <Transaction key={transaction.id} data={transaction} />
            ))}
          </tbody>
        </TransactionsContainer>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const transactions = [
    ...state.fetch.expenses.slice(0, 10).map(expense => ({ ...expense, type: 'expense' })),
    ...state.fetch.incomes.slice(0, 10).map(expense => ({ ...expense, type: 'income' }))
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 10);

  return { transactions };
};

export default connect(mapStateToProps, {})(Transactions);
