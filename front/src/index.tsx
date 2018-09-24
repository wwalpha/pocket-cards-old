import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import Auth from '@aws-amplify/auth';
import AppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import App from './containers/App';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: blue['600'],
    },
    secondary: {
      main: deepOrange['600'],
    },
  },
});

const client = new AppSyncClient({
  url: 'htt@:://',
  region: 'ap-northeast-1',
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    credentials: () => Auth.currentCredentials(),
  },
});

render(
  <ApolloProvider client={client}>
    <Rehydrated>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById('root'),
);
