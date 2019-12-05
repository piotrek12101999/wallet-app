import React from 'react';
import styled from 'styled-components';
import TouchCarousel from 'react-touch-carousel';
import { CarouselContainer, cardSize } from './CarouselContainer/CarouselContainer';

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
  background: ${props => (props.left ? '#F66C7B' : '#4BD1DC')};
`;

const StyledCard = styled.div`
  height: 100%;
  margin-top: 16px;
  -webkit-tap-highlight-color: transparent;

  .expense-container {
    width: 350.5px;
    margin-bottom: 16px;
  }
`;

export const ExpensesCarousel: React.FC = () => {
  const renderCard = (index: number, modIndex: number): JSX.Element => {
    return (
      <StyledCard key={index}>
        <div className="expense-container">
          <Stats>
            <div>
              <p className="day"> Today </p>
              <div>
                <div>
                  <p className="spent"> Spent </p>
                  <p className="ammount --minus"> : $280</p>
                </div>
                <div>
                  <p className="spent"> Income </p>
                  <p className="ammount --plus"> : $280</p>
                </div>
              </div>
            </div>
            <div>
              <ProgressBar width="33%" left />
              <ProgressBar width="66%" left={false} />
            </div>
          </Stats>
        </div>
      </StyledCard>
    );
  };

  return (
    <TouchCarousel
      component={CarouselContainer}
      cardSize={cardSize}
      cardCount={3}
      cardPadCount={0}
      renderCard={renderCard}
      loop={false}
    />
  );
};
