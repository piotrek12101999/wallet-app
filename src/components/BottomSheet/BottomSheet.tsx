import React from 'react';
import { connect } from 'react-redux';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import styled from 'styled-components';
import { MinimizeRounded } from '@material-ui/icons';
import { IAppState } from '../../models/store.interfaces';
import { IBottomSheetState } from '../../models/ui.interfaces';
import { toggleBottomSheet } from '../../actions/uiActions';

import { Action } from './Types/Actions/Action';

const Container = styled.div`
  background-color: ${({ theme }) => `${theme.navColor} !important`};
  color: ${({ theme }) => theme.fontColor};
  padding: 10px 30px;

  & > .icon-container {
    margin-top: -20px;
    display: flex;
    justify-content: center;

    & > .icon {
      color: gray;
    }
  }

  & > .title {
    display: flex;
    justify-content: center;
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: -12px;
  }

  & > .chips-container {
    & > p {
      padding-top: 8px;
      font-size: 14px;
      margin: 0;
      color: gray;
    }

    & > .MuiChip-root {
      margin: 3px;
    }
  }
`;

interface IBottomSheetProps {
  bottomSheetState: IBottomSheetState;
  toggleBottomSheet: (type: null) => void;
}

export const BottomSheet: React.FC<IBottomSheetProps> = ({ bottomSheetState, toggleBottomSheet }) => {
  return (
    <SwipeableBottomSheet
      style={{ zIndex: 2 }}
      bodyStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      open={bottomSheetState.open}
      onChange={() => {
        toggleBottomSheet(null);
      }}
    >
      <Container>
        <div className="icon-container">
          <MinimizeRounded className="icon" fontSize="large" />
        </div>
        <p className="title"> Add Income </p>
        <Action />
      </Container>
    </SwipeableBottomSheet>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    bottomSheetState: state.ui.bottomSheetState
  };
};

export default connect(mapStateToProps, { toggleBottomSheet })(BottomSheet);
