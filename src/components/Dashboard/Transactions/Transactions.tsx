import React from 'react';

import { Transaction } from './Transaction';
import styled from 'styled-components';

const TransactionsContainer = styled.table`
  width: 100%;
  border-spacing: 0 1em;
`;

export const Transactions: React.FC = () => {
  return (
    <>
      <TransactionsContainer>
        <tbody>
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
        </tbody>
      </TransactionsContainer>
    </>
  );
};
