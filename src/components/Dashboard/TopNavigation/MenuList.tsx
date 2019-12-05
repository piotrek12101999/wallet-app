import React from 'react';
import styled from 'styled-components';
import { Menu, MenuItem, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToAppRounded, Brightness4Rounded, Brightness7Rounded } from '@material-ui/icons';

const StyledMenu = styled(Menu)`
  & > .MuiPaper-root {
    background: ${({ theme }) => theme.navColor};
    color: ${({ theme }) => (theme.fontColor === '#fff' ? '#fff' : 'rgba(0,0,0,.54)')};
  }
`;

interface IMenuList {
  anchorEl: HTMLElement | null;
  isDarkThemeEnabled: boolean;
  handleClose: () => void;
  handleThemeToggle: () => void;
  handleSignOut: () => void;
}

export const MenuList: React.FC<IMenuList> = ({
  anchorEl,
  isDarkThemeEnabled,
  handleClose,
  handleThemeToggle,
  handleSignOut
}) => {
  const renderAppropriateThemeListItem = (isDarkThemeEnabled: boolean): JSX.Element => {
    const colorStyles = { color: isDarkThemeEnabled ? '#fff' : 'rgba(0,0,0,.54)' };

    return (
      <ListItem>
        <ListItemIcon>
          {isDarkThemeEnabled ? <Brightness4Rounded style={colorStyles} /> : <Brightness7Rounded style={colorStyles} />}
        </ListItemIcon>
        <ListItemText> {isDarkThemeEnabled ? 'Light' : 'Dark'} mode </ListItemText>
      </ListItem>
    );
  };

  return (
    <StyledMenu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleThemeToggle} component="div">
        {renderAppropriateThemeListItem(isDarkThemeEnabled)}
      </MenuItem>
      <MenuItem onClick={handleSignOut} component="div">
        <ListItem>
          <ListItemIcon>
            <ExitToAppRounded style={{ color: isDarkThemeEnabled ? '#fff' : 'rgba(0,0,0,.54)' }} />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </ListItem>
      </MenuItem>
    </StyledMenu>
  );
};
