import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Snackbar as SnackbarComponent } from '@material-ui/core';
import { ISnackbarState } from '../../models/ui.interfaces';
import { IAppState } from '../../models/store.interfaces';
import { toggleSnackbar } from '../../actions/uiActions';

const StyledSnackbar = styled(SnackbarComponent)`
  & > .MuiSnackbarContent-root {
    border-radius: 24px;
  }
`;

interface ISnackbarProps {
  state: ISnackbarState;
  toggleSnackbar: (data: ISnackbarState) => void;
}

const Snackbar: React.FC<ISnackbarProps> = ({ state: { type, message }, toggleSnackbar }) => {
  const isOpen: boolean = !!type;

  const hideSnackbar = (): void => toggleSnackbar({ type: null, message: '' });
  return <StyledSnackbar open={isOpen} autoHideDuration={3000} message={message} onClose={hideSnackbar} />;
};

const mapStateToProps = (state: IAppState) => ({
  state: state.ui.snackbarState
});

export default connect(mapStateToProps, { toggleSnackbar })(Snackbar);
