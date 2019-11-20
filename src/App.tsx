import React, { useEffect } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { startListeningForAuthChanges } from './actions/authActions';
import { IAppState } from './models/store.interfaces';
import { history } from './history';
import { themes } from './themes';

import { Dashboard } from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Overpass', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

interface AppProps {
  startListeningForAuthChanges: () => void;
  isSignedIn: boolean;
  isDarkThemeEnabled: boolean;
}

const App: React.FC<AppProps> = ({ startListeningForAuthChanges, isSignedIn, isDarkThemeEnabled }) => {
  useEffect(() => {
    startListeningForAuthChanges();
  }, [startListeningForAuthChanges]);
  const theme = isDarkThemeEnabled ? 'dark' : 'light';
  return (
    <ThemeProvider theme={themes[theme]}>
      <>
        <GlobalStyle />
        <Router history={history}>
          <Route exact path="/" render={() => (isSignedIn ? <Dashboard /> : <Redirect to="/sign" />)} />
          <Route path="/sign" component={SignIn} />
        </Router>
      </>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    isDarkThemeEnabled: state.ui.isDarkThemeEnabled
  };
};

export default connect(mapStateToProps, { startListeningForAuthChanges })(App);
