import React, { useState } from 'react';
import { BottomNavigation as BottomNav, BottomNavigationAction } from '@material-ui/core';
import { FolderRounded, RestoreRounded, FavoriteRounded, LocationOnRounded } from '@material-ui/icons';
import styled from 'styled-components';

const StyledBottomNavigation = styled(BottomNav)`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`;

export const BottomNavigation = () => {
  const [value, setValue] = useState<string>('recents');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  return (
    <StyledBottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction label="Recents" value="recents" icon={<FolderRounded />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<RestoreRounded />} />
      <BottomNavigationAction label="Nearby" value="nearby" icon={<FavoriteRounded />} />
      <BottomNavigationAction label="Folder" value="folder" icon={<LocationOnRounded />} />
    </StyledBottomNavigation>
  );
};
