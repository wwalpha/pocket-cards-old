import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import AppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import config from './aws-exports';
import App from './containers/App';

Amplify.configure(config);

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
  disableOffline: true,
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
});

const start = async () => {
  await Auth.signIn('wwalpha', 'session10');

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
};

start();
