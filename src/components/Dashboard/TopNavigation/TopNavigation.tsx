import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Avatar, Menu, MenuItem, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToAppRounded, Brightness4Rounded } from '@material-ui/icons';
import { signOut } from '../../../actions/authActions';
import { toggleTheme } from '../../../actions/uiActions';
import { IAppState } from '../../../models/store.interfaces';

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
      color: #1f3077;
    }

    & > span {
      font-size: 15px;
      color: #858eb4;
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
}

const TopNavigation: React.FC<ITopNavigation> = ({ signOut, isDarkThemeEnabled, toggleTheme }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    toggleTheme(!isDarkThemeEnabled);
    handleClose();
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  return (
    <TopNavContainer>
      <div className="welcome-text">
        <p> Hi, Piotr Świątek</p>
        <span> Today Mon, 15 Sep </span>
      </div>
      <Avatar
        onClick={handleClick}
        src="https://lh3.googleusercontent.com/-TiQdLz0pJfI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcYEIHXkDPdnZbWrtvNjPcpZj35eA.CMID/s128-c/photo.jpg"
      />
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleThemeToggle} component="div">
          <ListItem>
            <ListItemIcon>
              <Brightness4Rounded />
            </ListItemIcon>
            <ListItemText> Dark mode </ListItemText>
          </ListItem>
        </MenuItem>
        <MenuItem onClick={handleSignOut} component="div">
          <ListItem>
            <ListItemIcon>
              <ExitToAppRounded />
            </ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </ListItem>
        </MenuItem>
      </Menu>
    </TopNavContainer>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    isDarkThemeEnabled: state.ui.isDarkThemeEnabled
  };
};

export default connect(mapStateToProps, { signOut, toggleTheme })(TopNavigation);
