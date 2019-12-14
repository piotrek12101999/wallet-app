import React from 'react';
import { Menu, MenuItem, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToAppRounded, Brightness4Rounded, Brightness7Rounded } from '@material-ui/icons';

interface IMenuListProps {
  anchorEl: HTMLElement | null;
  isDarkThemeEnabled: boolean;
  handleClose: () => void;
  handleThemeToggle: () => void;
  handleSignOut: () => void;
}

export const MenuList: React.FC<IMenuListProps> = ({
  anchorEl,
  isDarkThemeEnabled,
  handleClose,
  handleThemeToggle,
  handleSignOut
}) => {
  const renderAppropriateThemeListItem = (isDarkThemeEnabled: boolean): JSX.Element => (
    <ListItem>
      <ListItemIcon>{isDarkThemeEnabled ? <Brightness7Rounded /> : <Brightness4Rounded />}</ListItemIcon>
      <ListItemText> {isDarkThemeEnabled ? 'Light' : 'Dark'} mode </ListItemText>
    </ListItem>
  );

  return (
    <Menu
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
            <ExitToAppRounded />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </ListItem>
      </MenuItem>
    </Menu>
  );
};
