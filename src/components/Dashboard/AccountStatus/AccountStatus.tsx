import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import image from '../../../assets/dashboard-image.png';
import { IAppState } from '../../../models/store.interfaces';

const AccountStatusContainer = styled.div<{ height: string }>`
  padding: 25px;
  grid-column: 1 / -1;
  background: ${({ theme }) => theme.gridColor};
  height: ${props => props.height};
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  & > .stats {
    display: flex;
    justify-content: space-between;

    & > .balance {
      .subtitle {
        color: ${({ theme }) => theme.secondaryFontColor};
      }

      .title {
        margin: 0;
        color: ${({ theme }) => theme.fontColor};
        font-weight: 600;
        font-size: 28px;
      }
    }

    & > .img {
      height: 100px;
      transform: translateY(-22px);
    }
  }

  & > .chart {
    margin-top: 20px;
  }
`;

const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
};

interface IAccountStatusProps {
  balance: number;
}

const AccountStatus: React.FC<IAccountStatusProps> = ({ balance }) => {
  const [toggle, setToggle] = useState(true);

  const handle = () => setToggle(!toggle);
  return (
    <AccountStatusContainer height={toggle ? '110px' : '300px'} onClick={handle}>
      <div className="stats">
        <div className="balance">
          <span className="subtitle"> Total balance </span>
          <p className="title"> £{balance} </p>
        </div>
        <img className="img" src={image} alt="expenses" />
      </div>
      <div className="chart" onClick={event => event.stopPropagation()}>
        <Doughnut data={data} />
      </div>
    </AccountStatusContainer>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    balance: state.fetch.user.balance
  };
};

export default connect(mapStateToProps, {})(AccountStatus);
