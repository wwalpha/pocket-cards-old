import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import Auth from '@aws-amplify/auth';
import AppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import App from './containers/App';

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
      <App />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById('root'),
);
