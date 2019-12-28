import React from 'react';
import styled from 'styled-components';
import { IDateStats } from './ExpensesCarousel';

const Stats = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 343px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.gridColor};

  & > p {
    margin: 0;
  }

  & > div {
    display: flex;
    justify-content: space-between;

    & > .day {
      font-size: 22px;
      margin: 0;
      color: ${({ theme }) => theme.fontColor};
    }

    & > div {
      display: flex;
      justify-content: space-around;

      & > div {
        margin-left: 5px;
        margin-right: 5px;

        & > p {
          margin: 0;
        }

        & > .ammount {
          color: ${({ theme }) => theme.fontColor};

          &.--minus::first-letter {
            color: red;
          }

          &.--plus::first-letter {
            color: green;
          }
        }

        & > .spent {
          font-weight: 300;
          font-size: 15px;
          color: ${({ theme }) => theme.secondaryFontColor};
        }
      }
    }
  }
`;

const ProgressBar = styled.div<{ width: string; left: boolean }>`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 33%;
  height: 6.5px;
  border-radius: 20px;
  width: ${props => props.width};
  background: ${props => (props.left ? props.theme.primaryColor : props.theme.secondaryColor)};
`;

interface ICarouselCardProps {
  name: string;
  cardData: IDateStats | null;
}

export const CarouselCard: React.FC<ICarouselCardProps> = ({ name, cardData }) => {
  const dataToShow: IDateStats = cardData ? cardData : { name: 'Today', balance: 0, expense: 0 };
  const percent = Math.round((dataToShow.expense / dataToShow.balance) * 100);

  return (
    <Stats>
      <div>
        <p className="day"> {name} </p>
        <div>
          <div>
            <p className="spent"> Spent </p>
            <p className="ammount --minus"> £ {dataToShow.expense}</p>
          </div>
          <div>
            <p className="spent"> Balance </p>
            <p className="ammount --plus"> £ {dataToShow.balance}</p>
          </div>
        </div>
      </div>
      <div>
        <ProgressBar width={`${percent}%`} left />
        <ProgressBar width={`${99 - percent}%`} left={false} />
      </div>
    </Stats>
  );
};
