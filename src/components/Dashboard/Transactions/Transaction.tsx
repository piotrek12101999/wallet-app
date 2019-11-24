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
      color: #1f3077;
      font-weight: 600;
      font-size: 18px;
    }
  }

  & > .date {
    width: 15%;

    & > span {
      font-size: 14px;
      color: #858eb4;
    }
  }

  & > .brand-icon {
    width: 30%;
    align-items: center;

    .icon-container {
      margin: auto;
      height: 45px;
      width: 45px;
      border-radius: 8px;
      background: white;
      padding: 5px;

      & > .icon {
        background-image: url('https://magazine.artstation.com/wp-content/uploads/2018/07/ArtStation_EA_Logo_400x400-1.jpg');
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }

  & > .brand-name {
    width: 30%;

    p {
      margin: unset;
      color: #1f3077;
      font-weight: 600;
      font-size: 18px;
    }
  }

  & > .ammount {
    width: 25%;
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
        <div className="icon-container">
          <div className="icon" />
        </div>
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

// margin-top: 10px;
//   margin-bottom: 10px;
//   display: grid;
//   grid-template-columns: 0.5fr 2fr 0.5fr;

//   & > .date,
//   .ammount {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;

//     & > p {
// margin: unset;
// color: #1f3077;
// font-weight: 600;
// font-size: 18px;
//     }
//   }

// & > .date {
//   & > span {
//     font-size: 14px;
//     color: #858eb4;
//   }
// }

//   & > .brand {
//     display: flex;
//     justify-content: space-evenly;
//     align-items: center;

//     & > .img {
//       height: 50px;
//       width: 50px;
//       border-radius: 8px;
//       background: white;

//       & .img-src {
//         height: 100%;
//         background-image: url(data:image/png;base64,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);
//         background-size: contain;
//       }
//     }

//     & > .name {
//       color: red;
//     }
//   }
