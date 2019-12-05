import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { Avatar } from '@material-ui/core';
import { signOut } from '../../../actions/authActions';
import { toggleTheme } from '../../../actions/uiActions';
import { IAppState } from '../../../models/store.interfaces';
import { IUser } from '../../../models/auth.interfaces';
import { MenuList } from './MenuList';

const TopNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 25px;

  & > .welcome-text {
    & > p {
      font-size: 19px;
      font-weight: 600;
      margin: unset;
      color: ${({ theme }) => theme.fontColor};
    }

    & > span {
      font-size: 15px;
      color: ${({ theme }) => theme.secondaryFontColor};
    }
  }

  & > .avatar {
    width: 52px;
    height: 52px;
  }
`;

interface ITopNavigation {
  signOut: () => void;
  toggleTheme: (isLightThemeEnabled: boolean) => void;
  isDarkThemeEnabled: boolean;
  userData: IUser | null;
}

const TopNavigation: React.FC<ITopNavigation> = ({ signOut, isDarkThemeEnabled, toggleTheme, userData }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleThemeToggle = (): void => {
    toggleTheme(!isDarkThemeEnabled);
    handleClose();
  };

  const handleSignOut = (): void => {
    signOut();
    handleClose();
  };

  const date: string = moment().format('dddd, Do MMM');

  const checkIfUserProvidedPhoto = (photo: string | null): string => {
    if (photo !== null) {
      return photo;
    }

    return 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg';
  };

  return (
    <TopNavContainer>
      <div className="welcome-text">
        <p> Hi, {userData ? userData.displayName : 'User'}</p>
        <span> Today is {date} </span>
      </div>
      <Avatar onClick={handleClick} src={checkIfUserProvidedPhoto(userData ? userData.photoURL : null)} />
      <MenuList
        anchorEl={anchorEl}
        isDarkThemeEnabled={isDarkThemeEnabled}
        handleClose={handleClose}
        handleSignOut={handleSignOut}
        handleThemeToggle={handleThemeToggle}
      />
    </TopNavContainer>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    userData: state.auth.userData,
    isDarkThemeEnabled: state.ui.isDarkThemeEnabled
  };
};

export default connect(mapStateToProps, { signOut, toggleTheme })(TopNavigation);
