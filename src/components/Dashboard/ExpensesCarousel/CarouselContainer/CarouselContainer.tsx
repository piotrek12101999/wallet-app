import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import NonPassiveTouchTarget from './NonPassiveTouchTarget';
// background: ${({ theme }) =>
//     `linear-gradient(180deg, ${theme.backgroundOnPrimaryColor} 50%, ${theme.background} 50%)`};
const StyledCarouselContainer = styled(NonPassiveTouchTarget)`
  transition: all ease-in-out 0.3s !important;
  background: ${({ theme }) => theme.backgroundOnPrimaryColor};
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  overflow: hidden;
  touch-action: pan-y;
`;

const StyledCarouselTrack = styled(NonPassiveTouchTarget)`
  display: flex;
  height: 100%;
`;

interface ICarouselContainer {
  cursor: number;
  carouselState: {
    active: boolean;
    dragging: boolean;
  };
}

export const cardSize = window.innerWidth * 0.935;
const carouselWidth = window.innerWidth;

export const CarouselContainer: React.FC<ICarouselContainer> = ({
  cursor,
  carouselState: { active, dragging },
  ...rest
}) => {
  let current: number = -Math.round(cursor) % 3;
  while (current < 0) {
    current += 3;
  }

  const translateX: number = cursor * cardSize + (carouselWidth - cardSize) / 2;
  return (
    <StyledCarouselContainer
      className={cx('carousel-container', {
        'is-active': active,
        'is-dragging': dragging
      })}
    >
      <StyledCarouselTrack style={{ transform: `translate3d(${translateX}px, 0, 0)` }} {...rest} />
    </StyledCarouselContainer>
  );
};
