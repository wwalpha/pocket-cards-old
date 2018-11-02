import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import AppSyncClient, { AUTH_TYPE, createAppSyncLink } from 'aws-appsync';
import Auth from '@aws-amplify/auth';
import { ApolloLink } from 'apollo-link';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { blue, deepOrange } from '@material-ui/core/colors';
import config from './aws-exports';
import App from './containers/App';
import { stateLink, GQL_UPDATE_USER } from '@gql';
import { UpdateUser, UpdateUserVariables } from 'typings/graphql';

Auth.configure(config);

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

// const store = createstore();

const appSyncLink = createAppSyncLink({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials() as any,
});

const link = ApolloLink.from([stateLink, appSyncLink]);

const client = new AppSyncClient({ disableOffline: true } as any, { link });

// const client = new AppSyncClient({
//   disableOffline: true,
//   url: config.aws_appsync_graphqlEndpoint,
//   region: config.aws_appsync_region,
//   auth: {
//     type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
//     jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
//   },
//   complexObjectsCredentials: () => Auth.currentCredentials() as any,
// });

const start = async () => {
  await Auth.signIn('wwalpha', 'session10');

  // Storage.configure({ level: 'private' });

  await client.mutate<UpdateUser, UpdateUserVariables>({
    mutation: GQL_UPDATE_USER,
    variables: {
      id: 'wwalpha',
      username: 'wwalpha',
    },
  });

  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'),
  );
};

start();
