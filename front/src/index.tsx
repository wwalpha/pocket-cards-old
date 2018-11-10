import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import AppSyncClient, { AUTH_TYPE, createAppSyncLink } from 'aws-appsync';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { ApolloLink } from 'apollo-link';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { deepOrange, indigo } from '@material-ui/core/colors';
import config from './aws-exports';
import App from './containers/App';
import { UpdateUser, UpdateUserVariables } from 'typings/graphql';
import { GQL_UPDATE_USER, stateLink } from '@gql/local';

Auth.configure(config);
Storage.configure(config);

const theme: Theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: deepOrange,
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

const app: any = {
  // Application Constructor
  initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady() {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent(id: any) {
    start();
  },
};

app.initialize();
