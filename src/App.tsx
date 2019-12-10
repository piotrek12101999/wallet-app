import React, { useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { startListeningForAuthChanges } from './actions/authActions';
import { IAppState } from './models/store.interfaces';
import { history } from './history';
import { themes, lightThemeColor } from './themes';

import SignIn from './components/SignIn/SignIn';
import { InitializingUser } from './components/InitializingUser/InitializingUser';
import { Dashboard } from './components/Dashboard/Dashboard';
import { BottomNavigation } from './components/BottomNavigation/BottomNavigation';

const GlobalStyle = createGlobalStyle<{ isDarkThemeEnabled: boolean }>`
  body {
    margin: 0;
    padding: 0;
    background: ${props => (props.isDarkThemeEnabled ? '#121212' : '#f8f9f9')};
    font-family: 'Overpass', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *, *::before, *::after {
    transition: color, background ease-in-out .3s;
    box-sizing: border-box;
  }
`;

interface AppProps {
  startListeningForAuthChanges: () => void;
  isSignedIn: boolean;
  isDarkThemeEnabled: boolean;
  isInitializing: boolean;
}

const App: React.FC<AppProps> = ({ startListeningForAuthChanges, isSignedIn, isInitializing, isDarkThemeEnabled }) => {
  useEffect(() => {
    startListeningForAuthChanges();
  }, [startListeningForAuthChanges]);
  const theme = isDarkThemeEnabled ? 'dark' : 'light';
  const MUITheme: Theme = createMuiTheme({
    palette: {
      primary: isDarkThemeEnabled ? grey : lightThemeColor,
      type: isDarkThemeEnabled ? 'dark' : 'light'
    }
  });

  return (
    <MuiThemeProvider theme={MUITheme}>
      <ThemeProvider theme={{ ...themes.global, ...themes[theme] }}>
        <>
          <GlobalStyle isDarkThemeEnabled={isDarkThemeEnabled} />
          {isInitializing && <InitializingUser />}
          <Router history={history}>
            <Route exact path="/" component={isSignedIn ? Dashboard : SignIn} />
            {isSignedIn && <BottomNavigation />}
          </Router>
        </>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    isInitializing: state.auth.isInitializing,
    isDarkThemeEnabled: state.ui.isDarkThemeEnabled
  };
};

export default connect(mapStateToProps, { startListeningForAuthChanges })(App);
