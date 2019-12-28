import React from 'react';
import styled from 'styled-components';

import image from '../../../assets/empty.png';

const StyledEmptyList = styled.div`
  color: ${({ theme }) => theme.fontColor};
  text-align: center;

  & > .image {
    height: 300px;
    margin-top: 20px;
    background-image: url(${image});
    background-repeat: no-repeat;
    background-size: contain;
  }

  & > .title {
    margin: 0;
    margin-top: -24px;
    font-size: 20px;
  }

  & > .subtitle {
    margin: 0;
    margin-bottom: 75px;
  }
`;

export const EmptyList: React.FC = () => {
  return (
    <StyledEmptyList>
      <div className="image" />
      <p className="title"> Ooopsie </p>
      <p className="subtitle"> There is nothing to see here </p>
    </StyledEmptyList>
  );
};
