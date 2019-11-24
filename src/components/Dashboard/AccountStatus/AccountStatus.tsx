import React, { useState } from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';

const AccountStatusContainer = styled.div<{ height: string }>`
  padding: 25px;
  grid-column: 1 / -1;
  background: white;
  height: ${props => props.height};
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  & > .stats {
    display: flex;
    justify-content: space-between;

    & > .balance {
      .subtitle {
        color: #858eb4;
      }

      .title {
        margin: 0;
        color: #1f3077;
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

export const AccountStatus: React.FC = () => {
  const [toggle, setToggle] = useState(true);

  const handle = () => setToggle(!toggle);
  return (
    <AccountStatusContainer height={toggle ? '110px' : '300px'} onClick={handle}>
      <div className="stats">
        <div className="balance">
          <span className="subtitle"> Total balance </span>
          <p className="title"> $3200,00 </p>
        </div>
        <img
          className="img"
          src="https://cdn.dribbble.com/users/1537480/screenshots/4666598/expert_community.png"
          alt="expenses"
        />
      </div>
      <div className="chart" onClick={event => event.stopPropagation()}>
        <Doughnut data={data} />
      </div>
    </AccountStatusContainer>
  );
};
