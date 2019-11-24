import React, { useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { startListeningForAuthChanges } from './actions/authActions';
import { IAppState } from './models/store.interfaces';
import { history } from './history';
import { themes } from './themes';

import { Dashboard } from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import { InitializingUser } from './components/InitializingUser/InitializingUser';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Overpass', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *, *::before, *::after {
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

  return (
    <ThemeProvider theme={{ ...themes.global, ...themes[theme] }}>
      <>
        <GlobalStyle />
        {isInitializing && <InitializingUser />}
        <Router history={history}>
          <Route exact path="/" component={isSignedIn ? Dashboard : SignIn} />
        </Router>
      </>
    </ThemeProvider>
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
