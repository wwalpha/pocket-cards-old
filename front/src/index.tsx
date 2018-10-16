import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import Amplify, { Auth, Storage } from 'aws-amplify';

import AppSyncClient, { AUTH_TYPE, createAppSyncLink } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { blue, deepOrange } from '@material-ui/core/colors';
import { ApolloLink } from 'apollo-link';
import { stateLink, UPDATE_PATH } from './queries/local';
import config from './aws-exports';
import App from './containers/App';
import { UPDATE_USER } from '@gql';
import { UpdatePathVariables } from 'typings/local';
import { PATH_INDEX } from '@const';

Amplify.configure(config);
// Storage.configure({
//   bucket: 'dev-pocketcards',
//   identityPoolId: 'ap-northeast-1:a1e28e02-d12a-4c5e-9d80-893d7c23b286',
// });

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

  Storage.configure({ level: 'private' });

  await client.mutate({
    mutation: UPDATE_USER,
    variables: {
      id: 'wwalpha',
      username: 'test',
    },
  });

  await client.mutate<any, UpdatePathVariables>({
    mutation: UPDATE_PATH,
    variables: {
      path: PATH_INDEX.HOME_ROOT,
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
