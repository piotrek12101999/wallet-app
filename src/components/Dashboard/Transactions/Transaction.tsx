import React from 'react';
import styled from 'styled-components';

const TransactionContainer = styled.tr`
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
      background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
`;

export const Transaction: React.FC = () => {
  return (
    <TransactionContainer>
      <td className="date">
        <span> Sep </span>
        <p> 11 </p>
      </td>
      <td className="brand-icon">
        <div className="icon" />
      </td>
      <td className="brand-name">
        <p> Netflix </p>
      </td>
      <td className="ammount">
        <p> -$9.99 </p>
      </td>
    </TransactionContainer>
  );
};
