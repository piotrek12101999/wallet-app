import React from 'react';
import styled from 'styled-components';
import { PaymentRounded, AccountBalanceRounded } from '@material-ui/icons';

const actions = {
  addExpense: {
    icon: <PaymentRounded className="icon" />,
    text: 'Add expense'
  },
  addIncome: {
    icon: <AccountBalanceRounded className="icon" />,
    text: 'Add income'
  }
};

const StyledAction = styled.div<{ actionType: 'addExpense' | 'addIncome' }>`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  background: ${props => (props.actionType === 'addExpense' ? props.theme.secondaryColor : props.theme.primaryColor)};
  padding: 10px;

  p {
    margin: unset;
    color: white;
    font-size: 21px;
  }

  .icon {
    color: white;
    display: block;
    margin-left: auto;
    margin-right: 0;
    font-size: 30px;
  }
`;

interface IPaymentActions {
  actionType: 'addExpense' | 'addIncome';
}

export const PaymentActions: React.FC<IPaymentActions> = ({ actionType }) => {
  return (
    <StyledAction actionType={actionType}>
      {actions[actionType].icon}
      <p> {actions[actionType].text} </p>
    </StyledAction>
  );
};
