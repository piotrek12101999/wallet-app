import React from 'react';
import { MoneyOffRounded, PersonAddRounded } from '@material-ui/icons';
import styled from 'styled-components';
import moment from 'moment';

import { ITransaction } from './Transactions';

const TransactionContainer = styled.tr<{ logo?: string; isExpense: boolean }>`
  margin-top: 10px;
  margin-bottom: 10px;

  & > .date,
  .ammount {
    text-align: center;

    p {
      margin: unset;
      color: ${({ theme }) => theme.fontColor};
      font-weight: 600;
      font-size: 18px;
    }

    .value {
      color: ${({ theme, isExpense }) => (isExpense ? theme.secondaryColor : theme.primaryColor)};
    }
  }

  & > .date {
    width: 15%;

    & > span {
      font-size: 14px;
      color: ${({ theme }) => theme.secondaryFontColor};
    }
  }

  & > .brand-name {
    width: 30%;

    & > p {
      margin: unset;
      color: ${({ theme }) => theme.fontColor};
      font-weight: 600;
      font-size: 18px;
    }
  }

  & > .ammount {
    width: 25%;
  }

  & > .brand-icon {
    width: 30%;
    align-items: center;

    .icon {
      margin: auto;
      height: 45px;
      width: 45px;
      border-radius: 16px;
      background: white;
      background-image: url(${props => props.logo || 'unset'});
      background-repeat: no-repeat;
      background-size: contain;

      & > svg {
        width: 35px;
        height: 35px;
      }
    }
  }
`;

interface ITransactionProps {
  data: ITransaction;
}

export const Transaction: React.FC<ITransactionProps> = ({ data }) => {
  const iconToDisplay: JSX.Element =
    data.type === 'expense' ? (
      <MoneyOffRounded style={{ marginLeft: 4, marginTop: 6, width: 35, height: 35 }} />
    ) : (
      <PersonAddRounded style={{ marginLeft: 5, marginTop: 7, width: 30, height: 30 }} />
    );
  return (
    <TransactionContainer logo={data.logo} isExpense={data.type === 'expense'}>
      <td className="date">
        <span> {moment(data.date).format('MMM')} </span>
        <p> {moment(data.date).format('DD')} </p>
      </td>
      <td className="brand-icon">
        <div className="icon">{!data.logo && iconToDisplay}</div>
      </td>
      <td className="brand-name">
        <p> {data.name || 'income'} </p>
      </td>
      <td className="ammount">
        <p className="value">
          {data.type === 'expense' ? '-' : '+'} {data.ammount.toFixed(2)}
        </p>
      </td>
    </TransactionContainer>
  );
};
