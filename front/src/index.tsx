import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import AppSyncClient, { AUTH_TYPE, createAppSyncLink } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { blue, deepOrange } from '@material-ui/core/colors';
import { ApolloLink } from 'apollo-link';
import { stateLink } from './queries/local';
import config from './aws-exports';
import App from './containers/App';
import { UPDATE_USER } from '@gql';

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

const appSyncLink = createAppSyncLink({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
});

const link = ApolloLink.from([stateLink, appSyncLink]);

const client = new AppSyncClient({} as any, { link });

const start = async () => {
  await Auth.signIn('wwalpha', 'session10');

  await client.mutate({
    mutation: UPDATE_USER,
    variables: {
      id: 'wwalpha',
      username: 'test',
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
};

start();
